//require('dotenv').config();
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackVersionFilePlugin = require('webpack-version-file-plugin');

module.exports = (options) => {
  const ExtractSASS = new MiniCssExtractPlugin({ filename: `styles/${options.cssFileName}` });

  const webpackConfig = {
    devtool: options.devtool,
    entry: Path.resolve(__dirname, '../src/app/index'),
    output: {
      path: Path.resolve(__dirname, '../dist'),
      publicPath: process.env.HOSTING_URL || '/',
      filename: '[name].js'
    },
    optimization: {
      splitChunks: { chunks: 'all' }
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: Path.resolve(__dirname, '../src/app'),
          use: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.css$/,
          use: [
            'style-loader', 'css-loader'
          ],
          exclude: /node_modules/
        }, {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: `svg-sprite-loader?${JSON.stringify({ name: '[name]_[hash]', prefixize: true })}`
        }]
    },
    plugins: [
      new WebpackVersionFilePlugin({
        packageFile: Path.join(__dirname, '../package.json'),
        template: Path.join(__dirname, '../version.ejs'),
        outputFile: Path.join(__dirname, '../static/version.json')
      }),
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction
            ? 'production'
            : 'development'),
          FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
          FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
          FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
          FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET)
        }
      })
    ]
  };

  if (options.isProduction) {
    webpackConfig.output.filename = 'scripts/[name].[chunkhash].js';

    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      path: process.env.HOSTING_URL
        ? process.env.HOSTING_URL
        : '/',
      template: Path.resolve(__dirname, '../src/index.html')
    }), new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static'
      }
    ]), ExtractSASS);

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1', 'postcss-loader?config=webpack/postcss.config.js', { loader: 'sass-loader', options: { implementation: require('sass') } }]
    });

    webpackConfig.module.rules.push({
      test: /\.(jpe?g|png|gif)$/,
      use: [
        {
          loader: 'file-loader',
          query: {
            limit: 40000,
            name: process.env.HOSTING_URL
              ? `${process.env.HOSTING_URL}/static/img/[name].[hash].[ext]`
              : 'static/img/[name].[hash].[ext]'
          }
        },
        'image-webpack-loader'
      ]
    });
  } else {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      path: '',
      template: Path.resolve(__dirname, '../src/index.html')
    }), new Webpack.HotModuleReplacementPlugin());

    webpackConfig.module.rules.push({
      test: /\.(jpe?g|png|gif)$/,
      use: ['file-loader', 'image-webpack-loader']
    });

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader?config=webpack/postcss.config.js', { loader: 'sass-loader', options: { implementation: require('sass') } }]
    });

    webpackConfig.devServer = {
      static: Path.resolve(__dirname, '../'),
      hot: true,
      historyApiFallback: true
    };
  }

  return webpackConfig;
};
