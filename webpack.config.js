const crntDir = __dirname;
const path = require('path');
const webpack = require('webpack');

module.exports = [{
  mode: 'production',

  entry: {
    main_page: path.resolve(crntDir, 'client/main_page.jsx'),
    login: path.resolve(crntDir, 'client/login.jsx'),
  },

  output: {
    path: path.resolve(crntDir, 'app/assets/javascripts'),
    publicPath: path.resolve(crntDir, 'app/assets/javascripts'),
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
