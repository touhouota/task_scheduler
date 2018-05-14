const crntDir = __dirname;
const path = require('path');

module.exports = [{
  mode: 'development',

  entry: {
    main_page: path.resolve(crntDir, 'client/main_page.jsx'),
    login: path.resolve(crntDir, 'client/login.jsx'),
  },

  output: {
    path: path.resolve(crntDir, 'public/js'),
    publicPath: path.resolve(crntDir, 'public/js'),
    filename: '[name].js',
  },

  module: {
    rules: [{
      exclude: /node_module/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}];
