const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../config/business.prod.env');
const shared = require('./shared')('production');

const backendConfig = shared('backend');
const clientConfig = shared('client');

module.exports = [
  {
    ...backendConfig,
    entry: path.resolve(__dirname, '../backend'),
    output: {
      publicPath: '/',
      filename: 'backend.js',
      path: path.resolve(__dirname, '../public'),
    },
    plugins: [
      ...backendConfig.plugins,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../shared/index.html'),
        filename: path.resolve(
          __dirname,
          '../public/admin/index_fallback.html',
        ),
        inject: true,
      }),
    ],
    externals: {
      config: JSON.stringify(config),
    },
  },
  {
    ...clientConfig,
    entry: path.resolve(__dirname, '../client'),
    output: {
      publicPath: '/',
      filename: 'client.js',
      path: path.resolve(__dirname, '../public'),
    },
    plugins: [
      ...clientConfig.plugins,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../shared/index.html'),
        filename: path.resolve(__dirname, '../public/index_fallback.html'),
        inject: true,
      }),
    ],
    externals: {
      config: JSON.stringify(config),
    },
  },
];
