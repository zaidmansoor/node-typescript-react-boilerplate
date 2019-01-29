let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');

var basePath = __dirname;

module.exports = {
    context: path.join(basePath, 'client'),
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    entry: {
      app: './src/index.tsx',
      vendorStyles: [
        '../node_modules/bootstrap/dist/css/bootstrap.css',
      ],
    },
    output: {
      path: path.join(basePath, 'client/dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'config/tsconfig-client.json',
            useBabel: true,
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/img/[name].[ext]?[hash]'
          }
        },
      ],
    },
    plugins: [
      //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.ejs', //Name of file in ./dist/
        template: 'views/index.ejs', //Name of template in ./src
        hash: true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
    ],
};