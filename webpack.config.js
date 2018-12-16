const crntDir = __dirname;
const path = require('path');

module.exports = [{
  mode: 'development',

  entry: {
    main_page: path.resolve(crntDir, 'client/main_page.jsx'),
    login: path.resolve(crntDir, 'client/login.jsx'),
    task_structure: path.resolve(crntDir, 'client/task_structure.jsx'),
    week_reflection: path.resolve(crntDir, 'client/week_reflection.jsx'),
    reflection: path.resolve(crntDir, 'client/reflection.jsx'),
    members_reflection: path.resolve(crntDir, 'client/members_reflection.jsx'),
    checklist: path.resolve(crntDir, 'client/checklist.js'),
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
        // babelの設定部分
        presets: [
          '@babel/preset-react',
          '@babel/preset-env',
        ],
      },
    }],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
}];
