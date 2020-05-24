module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.babel_cmj.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: 'commonjs' // 默认值是auto根据当前环境判断
              }]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    usedExports: true
  }
}
