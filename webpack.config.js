const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const BASE_JS = './src/client/js/';
module.exports = {
  entry: {
    main: BASE_JS + 'main.js',
    videoPlayer: BASE_JS + 'videoPlayer.js',
    recorder: BASE_JS + 'recorder.js',
    videoCommentSection: BASE_JS + 'videoCommentSection.js',
    postCommentSection: BASE_JS + 'postCommentSection.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
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
