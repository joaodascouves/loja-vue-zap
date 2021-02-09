const path = require('path');

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (mode) => (name = 'main') => ({
  mode,
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src'),
    ],
    alias: {
      static: path.resolve(__dirname, '../static'),
      shared: path.resolve(__dirname, '../shared'),
      backend: path.resolve(__dirname, '../backend'),
      client: path.resolve(__dirname, '../client'),
      config: path.resolve(__dirname, '../config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        use: 'vue-loader',
      },
      {
        test: /\.css?$/,
        use: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(t|o)tf?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './fonts/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.png?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.psvg?$/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.svg?$/,
        use: 'vue-svg-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${name}.css`,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
