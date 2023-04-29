const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './src/client/js/main.js',
  mode: 'development',
  plugins: [new MiniCssExtractPlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'assets', 'js'),
  },

  module: {
    rules: [
      {
        test: /\.js$/, // we want to take all the JS files
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        }, // we are applying THESE transformations - babel loader
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // in reverse order bc webpack starts from end to front
      },
    ],
  },
};
