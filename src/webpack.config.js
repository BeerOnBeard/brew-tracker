const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: "./client/index.js",
    recipe: "./client/recipe.js",
    brew: './client/brew.js',
    'new-recipe': './client/new-recipe.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin([
      { from: './client/index.html' },
      { from: './client/brew.html' },
      { from: './client/recipe.html' },
      { from: './client/new-recipe.html' },
      { from: './client/page.css' },
    ])
  ]
};
