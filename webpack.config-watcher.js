const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    watcher: './src/watcher/index.ts',
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: `${__dirname}/public`,
    filename: '[name].bundle.js',
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
