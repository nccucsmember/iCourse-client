const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 7084;

const developmentEntries = [
];

const developmentPlugins = [
  new webpack.HotModuleReplacementPlugin(),
];

const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin(),
];

module.exports = {
  entry: [
    ...(NODE_ENV !== 'production' ? developmentEntries : []),
    path.resolve(__dirname, 'entry.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: `'${process.env.API_HOST || 'http://localhost:4023'}'`,
    }),
    ...(NODE_ENV !== 'production' ? developmentPlugins : productionPlugins),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    hot: true,
    noInfo: true,
    compress: true,
    historyApiFallback: true,
    publicPath: '/',
    port: PORT,
    filename: 'bundle.js',
    contentBase: [
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'static'),
    ],
    disableHostCheck: true,
    host: '0.0.0.0',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
        include: __dirname,
      }, {
        test: /\.json$/,
        use: [
          'file-loader',
        ],
        include: [
          /locales/,
        ],
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[hash].[ext]',
          },
        }],
        include: /static/,
      },
    ],
  },
};

