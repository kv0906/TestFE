const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: 'style.css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  entry: {
    app: process.env.NODE_ENV === 'development' ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './app/app.js'
    ] : [
      'babel-polyfill',
      './app/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    extractSass
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
  devServer: {
    hot: false,
    inline: true,
    historyApiFallback: true,
    overlay: true,
    host: 'localhost',
    port: 3000,
    publicPath: 'http://localhost:3000/public/'
  },
  resolve: {
    alias: {
      HomePage: path.resolve(__dirname, 'app/components/Homepage/Homepage.js'),
      AddressTable: path.resolve(__dirname, 'app/components/Homepage/AddressTable.js'),
      AddressRow: path.resolve(__dirname, 'app/components/Homepage/AddressRow.js'),
      Form: path.resolve(__dirname, 'app/components/Homepage/Form.js'),
      Main: path.resolve(__dirname, 'app/components/Main.js')
    }
  },
  module: {
    rules: [
      {
        loaders: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(eot|gif|otf|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }

}
