const webpack = require('webpack');
const path = require('path');

const WebpackDevServer = require('webpack-dev-server');

const envMode = process.argv[2] === 'prod' ? 'prod' : 'dev';

const config = require(`./webpack.config.${envMode}`);

const compiler = webpack(config);

const options = {
  hot: true,
  compress: true,
  disableHostCheck: true,
  publicPath: '/',
  contentBase: path.resolve(__dirname, '../public'),
  watchOptions: {
    poll: true,
  },
  historyApiFallback: {
    index: '/',
  },
};

const servers = [
  new WebpackDevServer(compiler.compilers[0], {
    ...options,
  }),

  new WebpackDevServer(compiler.compilers[1], {
    ...options,
  }),
];

servers.forEach((server, index) => server.listen(8080 + index, () => false));
