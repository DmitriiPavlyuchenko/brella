const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 8081,
    client: {overlay: {warnings: false, errors: true}},
    static: {directory: baseWebpackConfig.externals.path.docs},
  },
  plugins: []
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})