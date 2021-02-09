const uploadService = require('../services/uploadService');

async function removeResidualUploads(payload, clientId) {
  if (payload.image) {
    await uploadService.remove(payload.image, clientId);
  }

  if (payload.images) {
    for (const image of Object.values(payload.images)) {
      if (typeof image !== 'string') {
        continue;
      }

      await uploadService.remove(image, clientId);
    }
  }
}

function parseBody(body) {
  return body && typeof body === 'object'
    ? Object.entries(body).map(([key, value]) => ({ [key]: value }))
    : [];
}

/* eslint-disable prefer-const, no-return-assign */
const SharedController = (Model, { allowUpload, allowMultiple }) => ({
  /**
   * Saves a document owned by `clientId` in the database.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  save: async ({ body }, clientId) => {
    let { _id, ...payload } = body;

    payload = {
      clientId,
      ...payload,
    };

    if ((allowUpload && body.file) || (allowMultiple && body.files)) {
      if (
        allowUpload
        && body.file
        && (!!body.file.content || !!body.file.link)
      ) {
        payload = {
          ...payload,
          image: await uploadService.move(body.file, clientId),
        };
      }

      if (allowMultiple && body.files) {
        // body.files.slice(0, 4).forEach((file) => {
        for (const file of Object.values(body.files.slice(0, 4))) {
          if (!file.name && !file.link) {
            continue;
          }

          if (
            !!file.link
            && body.images
            && body.images.indexOf(file.link) !== -1
          ) {
            continue;
          }

          const uploadedFile = await uploadService.move(file, clientId);

          if (uploadedFile) {
            if (file.current) {
              payload.images = payload.images.map((image) => (image === file.current ? uploadedFile : image));
            } else {
              payload.images = [...(payload.images || []), uploadedFile];
            }
          }
        }
      }
    }

    payload = {
      ...payload,
      ...(_id ? { _id } : {}),
      images: (payload.images || []).filter(
        (image) => typeof image === 'string' && image.length > 0,
      ),
    };

    try {
      return _id
        ? Model.findOneAndUpdate({ _id }, payload, {
          new: true,
          runValidators: true,
        })
        : Model.create(payload);
    } catch (error) {
      await removeResidualUploads(payload, clientId);
      throw error;
    }
  },

  /**
   * Removes a document owned by `clientId`.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  remove: async ({ body }, clientId) => {
    if (!body._id) {
      throw new Error('Impossível remover item sem ID');
    }

    const result = await Model.findOneAndDelete({
      $and: [{ clientId }, ...parseBody(body)],
    });

    if (result) {
      if (
        result.image
        || (typeof result.images === 'object' && result.images.length > 0)
      ) {
        await removeResidualUploads(result);
      }
    }

    return result;
  },

  /**
   * Removes a image from `body._id` owned by `clientId`.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  removeImage: allowUpload
    ? async ({ body }, clientId) => {
      const {
        _id, remove, image, images,
      } = body;

      const payload = {};

      if (image) {
        payload.image = undefined;
      } else if (images) {
        payload.images = images.filter((image) => image !== remove);
      }

      const filter = {
        $and: [{ clientId }, { _id }],
      };

      const result = await Model.findOneAndUpdate(filter, payload, {
        new: true,
        runValidators: false,
      });

      if (result) {
        uploadService.remove(remove, clientId);
      }

      return result;
    }
    : () => false,

  /**
   * Gets a single document owned by `clientId`.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  get: ({ body }, clientId) => Object.keys(body).length > 0
    && Model.findOne({
      $and: [{ clientId }, ...parseBody(body)],
    }),

  /**
   * Gets multiple documents owned by `clientId`.
   * @param {Object} req
   * @param {String} clientId
   * @returns {Object}
   */
  getAll: ({ body }, clientId) => Model.find({
    $and: [{ clientId }, ...parseBody(body)],
  }).sort({ updated_at: -1, created_at: -1 }),

  /**
   * Tells whether a document matching params exists.
   * @param {Object} req
   * @param {String} clientId
   * @return {Object}
   */
  exists: ({ body }, clientId) => Model.exists({
    $and: [{ clientId }, ...parseBody(body)],
  }),
});

module.exports = SharedController;
