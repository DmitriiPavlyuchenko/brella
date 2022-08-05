const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const fs = require('fs')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets',
}

const PAGES_DIR = `${PATHS.src}/pages`
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith('.html'))

module.exports = {

  externals: {
    path: PATHS,
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}/js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: "/node_modules/"
    },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: `[name].[ext]`
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)$/,
        loader: "file-loader",
        type: 'asset/resource',
        options: {
          name: `[name].[ext]`
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {config: `postcss.config.js`},
            },
          }, {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }
        ]
      }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name].[hash].css`,
    }),
    new copyPlugin({
      patterns: [
        {
          from: `${PATHS.src}/img/`, to: `${PATHS.assets}/img/`, noErrorOnMissing: true
        },
        {
          from: `${PATHS.src}/fonts/`, to: `${PATHS.assets}/fonts/`, noErrorOnMissing: true
        },
      ]
    }),
    ...PAGES.map(
        page =>
            new HtmlWebpackPlugin({
              template: `${PAGES_DIR}/${page}`,
              filename: `./${page}`
            })
    ),
    new CleanWebpackPlugin()
  ]
}