const crntDir = __dirname;
const path = require('path');

module.exports = [{
  mode: 'development',

  entry: path.resolve(crntDir, 'client/main_page.jsx'),

  output: {
    path: path.resolve(crntDir, 'public/js'),
    publicPath: path.resolve(crntDir, 'public/js'),
    filename: 'main_page.js',
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
