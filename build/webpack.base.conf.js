const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const fs = require('fs')

const PATHS = {
  src: path.join(__dirname, '../src'),
  docs: path.join(__dirname, '../docs'),
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
    filename: `js/[name].[hash].js`,
    path: PATHS.docs,
    publicPath: "/",
    clean: true,
    assetModuleFilename: pathData => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name][ext]`;
    },
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true
        }
      }
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: "/node_modules/"
    },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: (/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/),
        type: "asset/resource",
        generator: {
          filename: `img/[name].[hash:8][ext]`,
        }
      },
      {
        test: (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i),
        type: 'asset/resource',
        generator: {
          filename: `fonts/[name].[hash:8][ext]`,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {config: `postcss.config.js`},
            },
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }
        ]
      }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].[hash].css`,
    }),
    ...PAGES.map(
        page =>
            new HtmlWebpackPlugin({
              template: `${PAGES_DIR}/${page}`,
              filename: `./${page}`
            })
    ),
  ]
}