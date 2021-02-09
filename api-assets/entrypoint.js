const publicPaths = require('./publicPaths.js');
const { isTokenValid, decodeToken } = require('./services/authService');

/* eslint-disable consistent-return */
module.exports = {
  entrypoint: (callback) => async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

      res.setHeader(
        'Access-Control-Allow-Headers',
        'Accept, Accept-Version, Authorization, Content-Lenght, Content-MD5, Content-Type, Date, X-Api-Version',
      );

      if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
      }

      const authToken = req.headers.authorization
        ? req.headers.authorization.split('Bearer ').pop()
        : undefined;

      const auth = (() => {
        try {
          return authToken !== undefined ? decodeToken(authToken) : {};
        } catch (error) {
          return {};
        }
      })();

      const {
        query: { clientId },
      } = req || { query: {} };

      // atempt to use token from another domain
      if (auth.clientId && clientId) {
        if (auth.clientId !== clientId) {
          res.status(401).json({ _message: 'Você não tem poder aqui' });
          return;
        }
      }

      if (
        publicPaths.some((regex) => new RegExp(regex).test(req.url)) === false
      ) {
        if (!authToken || (auth && auth.role !== 'admin')) {
          return res.status(401).json({ _message: 'Acesso não autorizado' });
        }

        if (!isTokenValid(authToken)) {
          return res.status(401).json({ _message: 'Token inválido' });
        }
      }

      return await callback(req, res, clientId, auth);
    } catch (error) {
      const { message } = error;

      console.trace(error);
      return res.status(500).json({ _message: message, error });
    }
  },

  configEndpoint: (params) => async (req, res, clientId, auth) => {
    const { controller, description } = params;
    const {
      query: { verb },
    } = req;

    if (!(verb in controller)) {
      throw new Error('invalid endpoint');
    }

    let _message;
    switch (true) {
    case /_?save$/.test(verb):
      _message = `${description} salvo(a)`;
      break;
    case /_?remove$/.test(verb):
      _message = `${description} removido(a)`;
      break;
    case /_?removeImage$/.test(verb):
      _message = `Imagem removida de ${description}`;
      break;

    default:
      break;
    }

    const result = await controller[verb](req, clientId, auth, res);

    if (/_?get$/i.test(verb) && !result) {
      throw new Error('Item não encontrado');
    }

    if ((result !== undefined && result !== null) || _message) {
      res.status(200).send({ result, _message });
    }
  },
};
