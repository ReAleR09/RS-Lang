const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const watch = options.watch === 'true';

  const config = {
    devServer: {
      port: 8080,
      historyApiFallback: {
        index: '/',
      },
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch,
    entry: [
      './src/index.js',
      './src/sass/style.scss',
    ],
    output: {
      filename: 'js/script.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
      new CopyPlugin([
        { from: 'assets/', to: 'assets/' },
      ], {
        context: 'src/',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.?js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                emitError: isProduction,
                failOnError: isProduction,
                emitWarning: isProduction,
                failOnWarning: isProduction,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
  };

  return config;
};
