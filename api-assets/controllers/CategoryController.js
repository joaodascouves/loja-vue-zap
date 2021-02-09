const { Category } = require('../models/Category');
const Controller = require('./_SharedController')(Category, {
  allowUpload: true,
});

const CategoryController = {
  ...Controller,
};

module.exports = CategoryController;
