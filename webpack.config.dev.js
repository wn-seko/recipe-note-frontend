const fs = require('fs')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge').merge
const common = require('./webpack.config.common.js')
const API_URL = 'http://localhost:5000'

const stringToBoolean = (bool) => !!bool && bool !== 'false'

const isAnalyze = stringToBoolean(process.env.ANALYZE)

const isMock = stringToBoolean(process.env.MOCK_API)

const moduleMerged = merge(common, {
  module: {
    rules: [
      {
        loader: 'string-replace-loader',
        test: /src[\\\/]requests[\\\/]axios\.ts$/,
        options: {
          search: '[\\s\\S]*',
          replace: fs.readFileSync('./src/assets/js/axios/axios.ts').toString(),
          flags: '',
        },
      },
    ],
  },
})

module.exports = merge(isMock ? common : moduleMerged, {
  mode: isAnalyze ? 'production' : 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_URL: `"${API_URL}"`,
      MOCK_API: isMock,
    }),
  ].concat(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: '.',
  },
  devtool: 'source-map',
})
