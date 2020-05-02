module.exports = {
  mode: 'none',
  entry: './src/main.css',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 对同一个模块使用多个 loader，注意顺序, 数组最后一个往前开始
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}