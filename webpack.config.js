const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.tsx',
  },
  target: 'web',
  externals: ['fsevents'],
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: '[name].bundle.js',
    publicPath: '/scripts/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};
