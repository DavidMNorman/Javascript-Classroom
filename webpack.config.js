const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.s?css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      title: 'Development',
      template: path.join(__dirname, './client/index.html'),
    }),
  ],
  devServer: {
    static: {
      publicPath: '/',
      directory: path.join(__dirname, './dist'),
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
        pathRewrite: { '^api': '' },
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/app/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/auth/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
    hot: true,
    compress: true,
    port: 8080,
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
