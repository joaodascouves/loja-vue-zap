const { Featured } = require('../models/Featured');
const Controller = require('./_SharedController')(Featured, {
  allowUpload: true,
});

const FeaturedController = {
  ...Controller,

  getAll: ({ body }, clientId) => Controller.getAll(
    {
      body: {
        ...body,
        visible: true,
      },
    },
    clientId,
  ),

  adminGetAll: (req, clientId) => Controller.getAll(req, clientId),
};

module.exports = FeaturedController;
