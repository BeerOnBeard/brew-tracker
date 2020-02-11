const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new HtmlWebpackPlugin({
      chunks: [ 'index' ],
      filename: 'index.html',
      template: './client/template.html'
    }),
    new HtmlWebpackPlugin({
      chunks: [ 'recipe' ],
      filename: 'recipe.html',
      template: './client/template.html'
    }),
    new HtmlWebpackPlugin({
      chunks: [ 'brew' ],
      filename: 'brew.html',
      template: './client/template.html'
    }),
    new HtmlWebpackPlugin({
      chunks: [ 'new-recipe' ],
      filename: 'new-recipe.html',
      template: './client/template.html'
    }),
    new CopyPlugin([
      { from: './client/page.css' },
    ])
  ]
};
