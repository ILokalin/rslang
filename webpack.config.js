const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === 'dev';
const isProd = ENV === 'build';
const PATH = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}

function setDevTool() {
  if (isDev) {
    return 'cheap-module-eval-source-map';
  } else {
    return 'none';
  }
}

function setDMode() {
  if (isProd) {
    return 'production';
  } else {
    return 'development';
  }
}

const config = {
  target: "web",
    resolve: {
      alias: {
        Src: path.resolve(__dirname, './src'),
        Components: path.resolve(__dirname, './src/components'),
        Service:    path.resolve(__dirname, './src/service/'),
        Pages:      path.resolve(__dirname, './src/pages/'),
      },
      extensions: ['.js', '.json'],
    },
  entry: {
    'index':    PATH.source + '/pages/index/index.js',
    'audition': PATH.source + '/pages/audition/index.js',
    'pazzle':   PATH.source + '/pages/pazzle/index.js',
    'savana':   PATH.source + '/pages/savana/index.js',
    'speak-it': PATH.source + '/pages/speak-it/index.js',
    'sprint':   PATH.source + '/pages/sprint/index.js',
  },
  output: {
    path: PATH.dist,
    filename: (chunkData) => {
      return chunkData.chunk.name === 'index' ? '[name].js' : '[name]/[name].js'
    }
  },
  mode: setDMode(),
  devtool: setDevTool(),
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'/* , 'eslint-loader' */],
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.s*css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]'
          }},
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
          }
        }]
      },
      {
        test: /\.(mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'sound',
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    }),
    new HtmlWebPackPlugin({
      template: PATH.source + '/pages/index/index.html',
      chunks: ['index'],
      filename: './index.html'
    }),
    new HtmlWebPackPlugin({
      template: PATH.source + '/pages/audition/index.html',
      chunks: ['audition'],
      filename: 'audition/index.html'
    }),
    new HtmlWebPackPlugin({
      template: PATH.source + '/pages/pazzle/index.html',
      chunks: ['pazzle'],
      filename: 'pazzle/index.html'
    }),
    new HtmlWebPackPlugin({
      template: PATH.source + '/pages/savana/index.html',
      chunks: ['savana'],
      filename: 'savana/index.html'
    }),
    new HtmlWebPackPlugin({
      template: PATH.source + '/pages/speak-it/index.html',
      chunks: ['speak-it'],
      filename: 'speak-it/index.html'
    }),
    new HtmlWebPackPlugin({
      template: PATH.source + '/pages/sprint/index.html',
      chunks: ['sprint'],
      filename: 'sprint/index.html'
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    overlay: true,
    stats: 'errors-only',
    clientLogLevel: 'none'
  }
}

module.exports = config;
