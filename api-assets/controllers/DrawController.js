const { Draw } = require('../models/Draw');
const Controller = require('./_SharedController')(Draw, {});

const DrawController = {
  ...Controller,
};

module.exports = DrawController;
