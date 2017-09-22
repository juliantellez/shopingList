const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')

const htmlPlugin = new HtmlWebpackPlugin({
  template: './html/index.html',
  chunks: ['scripts'],
})

const webpackConfig = {
  devtool: 'source-map',
  context: config.APP,
  entry: {
    scripts: config.SCRIPTS,
    sw: path.resolve(config.SCRIPTS, 'sw'),
  },
  output: {
    filename: '[name].js',
    path: config.BUILD,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              camelCase: true,
              url: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    htmlPlugin,
  ],
}

module.exports = webpackConfig
