module.exports = {
  mode: 'none',
  optimization: {
    sideEffects: true
  },
  entry: './src/main.js',
  output: {
    filename: 'bundle.useExports.js',
    // filename: 'bundle.useExports.concat.js'
  }
}
