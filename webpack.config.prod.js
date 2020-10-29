const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge').merge
const common = require('./webpack.config.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const API_URL = 'https://api-attendance.orutaoyama.com'

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

module.exports = merge(moduleMerged, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      API_URL: `"${API_URL}"`,
      MOCK_API: false,
    }),
  ],
})
