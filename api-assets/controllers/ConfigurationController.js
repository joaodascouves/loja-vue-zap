const xmlBuilder = new (require('xml2js').Builder)();
const axios = require('axios');
const sharp = require('sharp');

const { ObjectId } = require('mongoose').Types;

const { s } = require('../templates');
const { getDomain } = require('../utils');
const { propIfExists, trimTags } = require('../helpers');

/* eslint-disable no-unused-vars */
const { Client } = require('../models/Client');
// const { Variation } = require('../models/_Variation');
const { ShipmentService } = require('../models/ShipmentService');
const { PaymentMethod } = require('../models/PaymentMethod');
/* eslint-enable no-unused-vars */

const { Product } = require('../models/Product');
const { Category } = require('../models/Category');
const { Featured } = require('../models/Featured');
const { Discount } = require('../models/Discount');
const { User } = require('../models/User');
const { Order } = require('../models/Order');

const uploadService = require('../services/uploadService');

const isAdmin = ({ url }) => /^\/admin/.test(url);

function populate(query) {
  return query.populate([
    {
      path: 'shipmentServices',
      model: 'ShipmentService',
    },
    {
      path: 'paymentMethods',
      model: 'PaymentMethod',
    },
  ]);
}

const domainFromRequest = (req) => {
  const {
    headers: { host, origin, referer },
  } = req;

  return host && !/^localhost:/.test(host)
    ? host.replace(/:.*/, '')
    : getDomain(origin || referer);
};

const ConfigurationController = {
  /**
   * Fetchs initial config of client.
   * @param {Object} req
   * @returns {Object}
   */
  client_get: async (req) => {
    const domain = domainFromRequest(req);

    const client = await populate(
      Client.findOne({
        $and: [
          { active: true },
          { domains: { $regex: new RegExp(`${domain}$`) } },
        ],
      })
        // .cache(60*60*5)
        .lean(),
    );

    if (!client) {
      throw new Error('Cliente inválido');
    }

    try {
      const { version, versionAlias } = require('../version');
      client.version = `${version} (${versionAlias})`;
    } catch (error) {
      client.version = 0;
    }

    return client;
  },

  /**
   * Create a client, given an admin key.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  client_create: async ({ body }, clientId) => {
    const { ref, phone } = body;

    if (!ref || !['jurandir123'].includes(ref)) {
      throw new Error('Código inválido');
    }

    if (!phone) {
      throw new Error('Telefone inválido');
    }

    return Client.findOneAndUpdate({ phone }, {
      ...body,
      theme: body.theme ? body.theme : {},
      textSections: body.textSections ? body.textSections : {},
    }, {
      upsert: true,
      runValidators: true,
      new: true,
    });
  },

  /**
   * Saves client configs.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  client_save: async ({ body }, clientId) => {
    const shipmentServices = [];
    const paymentMethods = [];

    // upserts each one of the shipment services
    if (body.shipmentServices) {
      const promiseArray = body.shipmentServices.map((payload) => {
        const { _id, ...service } = payload;

        return ShipmentService.findOneAndUpdate(
          {
            $and: [{ clientId }, { _id: _id || new ObjectId() }],
          },
          {
            clientId,
            ...service,
          },
          {
            upsert: true,
            runValidators: true,
            new: true,
          },
        );
      });

      await Promise.all(
        promiseArray.map((promise) => promise.then((output) => shipmentServices.push(output._id))),
      );
    }

    // upserts each one of the payment methods
    if (body.paymentMethods) {
      const promiseArray = body.paymentMethods.map((payload) => {
        const { _id, ...method } = payload;

        return PaymentMethod.findOneAndUpdate(
          {
            $and: [{ clientId }, { _id: _id || new ObjectId() }],
          },
          {
            clientId,
            ...method,
          },
          {
            upsert: true,
            runValidators: true,
            new: true,
          },
        );
      });

      await Promise.all(
        promiseArray.map((promise) => promise.then((output) => paymentMethods.push(output._id))),
      );
    }

    let payload = {
      ...[
        'name',
        'shortName',
        'description',
        'keywords',
        'phone',
        'email',
        'instagram',
        'city',
        'state',
        'zipcode',
        'theme',
        'variations',
        'location',
        'textSections',
      ].reduce(
        (a, prop) => ({
          ...a,
          ...propIfExists(body, prop),
        }),
        {},
      ),

      ...(body.published ? { published: !!body.published } : {}),
      ...(body.physical ? { physical: !!body.physical } : {}),

      ...(body.shipmentServices ? { shipmentServices } : {}),
      ...(body.paymentMethods ? { paymentMethods } : {}),
    };

    if (payload.keywords) {
      payload.keywords = trimTags(payload.keywords);
    }

    if (body.file) {
      payload = {
        ...payload,
        logo: await uploadService.move(body.file, clientId),
      };
    }

    const client = await populate(
      Client.findOneAndUpdate({ _id: clientId }, payload, {
        new: true,
        runValidators: true,
      }),
    );

    // save was successfull
    if (client) {
      // cleans unused shipment services from database
      if (body.shipmentServices) {
        await ShipmentService.deleteMany({
          $and: [
            { clientId },
            {
              _id: {
                $nin: shipmentServices,
              },
            },
          ],
        });
      }

      // cleans unused payment methods from database
      if (body.paymentMethods) {
        await PaymentMethod.deleteMany({
          $and: [
            { clientId },
            {
              _id: {
                $nin: paymentMethods,
              },
            },
          ],
        });
      }
    }

    return client;
  },

  /**
   * Fetchs all available clients.
   * @returns {Object}
   */
  client_getAll: () => Client.find(),

  /**
   * Gets common stats for `clientId`.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  client_stats: async (req, clientId) => {
    /* eslint-disable no-unused-vars */
    const now = new Date();

    const productCount = await Product.countDocuments({ clientId });
    const categoryCount = await Category.countDocuments({ clientId });
    const featuredCount = await Featured.countDocuments({ clientId });
    const discountCount = await Discount.countDocuments({
      $and: [
        { clientId },
        { initDate: { $lte: now } },
        { expirationDate: { $gte: now } },
      ],
    });
    const customerCount = await User.countDocuments({
      $and: [{ clientId }, { role: 'user' }],
    });
    const orderCount = await Order.countDocuments({ clientId });

    return {
      productCount,
      categoryCount,
      featuredCount,
      discountCount,
      customerCount,
      orderCount,
    };
    /* eslint-enable no-unused-vars */
  },

  /**
   * Renders SPA with initial data set on `window`.
   * @param {Object} req
   * @param {String} clientId unused
   * @param {Object} auth unused
   * @param {Object} res
   */
  async render(req, clientId, auth, res) {
    const { build } = require('../../config/shared');
    let template = require('../templates/render');

    const { url } = req;

    const { domains, ...client } = await this.client_get(req);

    const webpackChunks = (() => {
      const chunkNames = isAdmin(req) ? build.adminChunks : build.clientChunks;

      return chunkNames
        .map((name) => `<script type="text/javascript" src="${name}"></script>`)
        .join('');
    })();

    const styleChunks = (() => {
      const chunkNames = isAdmin(req) ? build.adminStyleChunks : build.clientStyleChunks;

      return chunkNames
        .map((name) => `<link rel="stylesheet" href="${name}" />`)
        .join('');
    })();

    const manifestURI = isAdmin(req)
      ? '/static/admin/manifest.json'
      : '/static/manifest.json';

    const themeColor = isAdmin(req) ? '#444444' : client.theme.thematicColor2;

    const associations = {
      'base-href': isAdmin(req) ? '/admin/' : '/',
      'meta-url': `https://${domainFromRequest(req)}`,
      'meta-title': client.name || '',
      'meta-description': client.description || '',
      'meta-keywords': client.keywords || '',
      'meta-image': client.logo || '',
      'theme-color': themeColor || '',
      'webpack-chunks': webpackChunks,
      'style-chunks': styleChunks,
      'manifest-uri': manifestURI,
    };

    const state = new Map();
    state.set('client/business', client);

    let prerenderedDom = `<h1>${associations['meta-description']}</h1>
<img style="width: 300px" src="${associations['meta-image']}" />
<h2>Palavras chave: ${associations['meta-keywords']}</h2>
<h3>${associations['meta-title']}</h3>
`;

    try {
      if (/^\/product\/.*/.test(url)) {
        const [matches, slug] = url.match(/\/product\/([^$\?]+)/);

        const product = await Product.findOne({
          $and: [{ clientId: client._id }, { slug }],
        });

        Object.assign(associations, {
          'meta-title': `${product.title} | ${associations['meta-title']}`,
          'meta-description':
            product.description || associations['meta-description'],
          'meta-keywords': `${
            associations['meta-keywords']
          },${product.title.replace(/ */, ',')}`,
          'meta-image': product.image,
        });

        state.set('product/item', product);

        const currencyFormat = (price) => `R$ ${parseFloat(price || 0).toFixed(2).toString()}`;

        const originalPrice = currencyFormat(product.price);
        const effectivePrice = currencyFormat(product.effectivePrice);

        const { discount } = product;

        prerenderedDom = `<h1>${associations['meta-title']} ${discount ? `${discount}% OFF` : ''}</h1>
<h2>${associations['meta-description']}</h2>
<img style="width: 300px" src="${associations['meta-image']}" />
<h3>Preço: ${discount ? `de ${originalPrice} por ` : ''}${effectivePrice}</h3>
<h3>Palavras chave: ${associations['meta-keywords']}</h3>
`;
      }
    } catch (error) {
      res.status(404).redirect('/404');
      return;
    }

    const stateObject = {};
    state.forEach((value, key) => {
      stateObject[key] = value;
    });

    Object.assign(associations, {
      'initial-data': `window.INITIAL_DATA = ${JSON.stringify(stateObject)};`,
      'prerendered-dom': prerenderedDom,
    });

    if (!isAdmin(req)) {
      delete client.description;
      delete client.keywords;
      delete client.version;
    }

    Object.entries(associations).forEach(([placeholder, value]) => {
      template = template.replace(s(placeholder), value);
    });

    res.setHeader('Content-type', 'text/html');
    res.setHeader('Cache-control', 'must-revalidate, maxage=129600');
    res.send(template);
  },

  /**
   * Renders a sitemap.xml file.
   * @param {Object} req
   * @param {String} clientId unused
   * @param {Object} auth unused
   * @param {Object} res
   */
  async sitemap(req, clientId, auth, res) {
    const buildURL = (suffix) => {
      const uri = suffix.replace(/^\//, '');
      return `https://${domain}/${uri}`;
    };

    const formatDate = (date) => {
      if (!date || !('toISOString' in date)) {
        return '0000-00-00';
      }

      return date.toISOString().replace(/T.*/, '');
    };

    const client = await this.client_get(req);

    const products = await Product.find({ clientId: client._id }).select(
      'slug created_at updated_at',
    );
    const categories = await Category.find({ clientId: client._id }).select(
      'slug created_at updated_at',
    );

    const domain = domainFromRequest(req) || client.domains[0];
    const client_lastMod = client.updated_at || client.created_at;

    const document = {
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        url: [
          {
            loc: buildURL('/'),
            lastmod: formatDate(client_lastMod),
            changefreq: 'weekly',
            priority: 1,
          },

          {
            loc: buildURL('/about'),
            lastmod: formatDate(client_lastMod),
            changefreq: 'weekly',
            priority: 0.8,
          },

          {
            loc: buildURL('/terms-of-use'),
            lastmod: formatDate(client_lastMod),
            changefreq: 'weekly',
            priority: 0.8,
          },

          ...products.map(({ slug, created_at, updated_at }) => ({
            loc: buildURL(`product/${slug}`),
            lastmod: formatDate(updated_at || created_at),
            changefreq: 'weekly',
            priority: 0.9,
          })),

          ...categories.map(({ slug, created_at, updated_at }) => ({
            loc: buildURL(`products/all?category=${slug}`),
            lastmod: formatDate(updated_at || created_at),
            changefreq: 'weekly',
            priority: 0.9,
          })),
        ],
      },
    };

    const sitemap = xmlBuilder.buildObject(document);

    res.setHeader('Content-type', 'application/xml');
    res.send(sitemap);
  },

  /**
   * Renders robots.txt file.
   * @param {Object} req
   * @param {String} clientId unused
   * @param {Object} auth unused
   * @param {Object} res
   */
  async robots(req, clientId, auth, res) {
    const domain = domainFromRequest(req);

    let robots = require('../templates/robots');
    robots = robots.replace('__DOMAIN__', domain);

    res.setHeader('Content-type', 'text/plain');
    res.send(robots);
  },

  /**
   * Renders /static/manifest.json (client).
   * @param {Object} req
   * @param {String} clientId unused
   * @param {Object} auth unused
   * @param {Object} res
   */
  async clientManifest(req, clientId, auth, res) {
    const client = await this.client_get(req);
    // const client = await this.client_get(req);
    const manifestTemplate = require('../templates/manifest').default;

    const manifest = {
      ...manifestTemplate,

      name: client.name,
      short_name: client.shortName,
      description: client.description,
      theme_color: client.theme.thematicColor1,
      background_color: client.theme.thematicColor2,
    };

    res.setHeader('Content-type', 'application/json');
    res.send(manifest);
  },

  /**
   * Renders /static/admin/manifest.json (admin).
   * @param {Object} req
   * @param {String} clientId unused
   * @param {Object} auth unused
   * @param {Object} res
   */
  async adminManifest(req, clientId, auth, res) {
    const client = await this.client_get(req);
    const manifestTemplate = require('../templates/manifest').default;

    const manifest = {
      ...manifestTemplate,

      start_url: '/admin/',
      scope: '/admin/',
      name: `Gerenciador de ${client.name}`,
      short_name: `${client.shortName} Admin`,
      description: 'Gerenciar sua loja',
      theme_color: '#f0f0f0',
      background_color: '#0f0f0f',
    };

    res.setHeader('Content-type', 'application/json');
    res.send(manifest);
  },

  /**
   * Resizes and renders client icon as PNG format.
   * Allowed dimensions are square only and hardcoded.
   * @param {Object} req
   * @param {String} clientId
   * @param {Object} auth
   * @param {Object} res
   */
  async icon(req, clientId, auth, res) {
    const [match, width, height] = req.url.match(/icon(\w+)x(\w+)\?/);

    const isSizeValid = (width, height) => {
      const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];
      return width === height && sizes.includes(width);
    };

    if (!width || !height || !isSizeValid(+width, +height)) {
      throw new Error('Ícone não encontrado');
    }

    const {
      logo,
      theme: { thematicColor2 },
    } = await this.client_get(req);

    axios
      .get(logo, { responseType: 'arraybuffer' })
      .then((response) => Buffer.from(response.data))
      .then(async (buffer) => {
        const image = await sharp(buffer)
          .flatten({ background: thematicColor2 })
          .resize({
            width: +width,
            height: +height,
            background: thematicColor2,
            fit: 'contain',
          })
          .toBuffer();

        res.setHeader('Content-type', 'image/png');
        res.send(image);
      });
  },

  /**
   * Renders /serviceWorker.js.
   * @param {Object} req
   * @param {String} clientId
   * @param {Object} auth
   * @param {Object} res
   */
  serviceWorker(req, clientId, auth, res) {
    const sw = require('../templates/serviceWorker')(isAdmin(req));

    res.setHeader('Content-type', 'application/javascript');
    res.send(sw);
  },
};

module.exports = ConfigurationController;
