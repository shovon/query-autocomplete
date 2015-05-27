module.exports = {
  entry: {
    app: ['./src/browser.js']
  },
  output: {
    libraryTarget: 'umd',
    library: 'QueryInput',
    path: './build',
    filename: 'bundle.js',
    sourceMapFile: 'bundle.map'
  },
  externals: [
    {
      "jquery": {
        root: "jQuery"
      }
    }
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
