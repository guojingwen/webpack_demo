```
|-- tree-shaking
   ├── dist
   │   ├── bundle.min.js
   │   ├── bundle.js
   │   ├── bundle.useExports.js
   │   ├── bundle.useExports.concat.js
   │   ├── bundle.babel.js
   │   └── bundle.babel_cmj.js
   ├── src
   │   ├── components.js
   │   └── main.js
   ├── package.json
   ├── webpack.config.js
   ├── webpack.config.useExports.js
   └── webpack.config.babel.js
```

## tree-shaking

`npx webpack`

 查看 dist/bundle.min.js 搜索 createElement 发现只有一处，**说明Webpack 的 Tree-shaking 特性在生产模式下会自动开启**
 
需要注意的是，Tree-shaking 并不是指 Webpack 中的某一个配置选项，而是一组功能搭配使用过后实现的效果，这组功能在生产模式下都会自动启用，所以使用生产模式打包就会有 Tree-shaking 的效果。


## 开启tree-shaking
- `npx webpack --mode=none --output-filename=bundle.js`
- `npx webpack --config=webpack.config.useExports.js`

对比 `bundle.js` 与 `bundle.useExports.js` 可以了解到  `usedExports` - 只导出外部用到的成员

optimization 还有 minimize - 压缩打包结果 与usedExports一起使用

对比 `bundle.useExports.js` 与 `bundle.useExports.concat.js` 了解 concatenateModules 特性

concatenateModules 尽可能合并每一个模块到一个函数中， 这个特性又被称为 Scope Hoisting，也就是作用域提升


## Tree-shaking 实现的前提是 ES Modules，
也就是说：最终交给 Webpack 打包的代码，必须是使用 ES Modules 的方式来组织的模块化。

- `cnpm i -D @babel/core @babel-cli babel-loader @babel/preset-env`
- `npx webpack --config=webpack.config.babel.js`

对比 `bundle.babel.js` 与 `bundle.babel_cmj.js` 发现 `usedExports` 只作用与 ES Modules

最新版本的 babel-loader 并不会导致 Tree-shaking 失效。
如果你不确定现在使用的 babel-loader 会不会导致这个问题，
最简单的办法就是在配置中将 @babel/preset-env 的 modules 属性设置为 false，确保不会转换 ES Modules，
也就确保了 Tree-shaking 的前提。

## sideEffects
它允许我们通过配置标识我们的代码是否有副作用，从而提供更大的压缩空间。
> TIPS：模块的副作用指的就是模块执行的时候除了导出成员，是否还做了其他的事情。

副作用代码示例 `console.log(123)`
```js
// 为 Number 的原型添加一个扩展方法 // 这是副作用代码，但是不能移除，需要在package.json上面作标记
Number.prototype.pad = function (size) {
  const leadingZeros = Array(size + 1).join(0)
  return leadingZeros + this
}
```

那此时 Webpack 在打包某个模块之前，会先检查这个模块所属的 package.json 中的 sideEffects 标识，以此来判断这个模块是否有副作用，如果没有副作用的话，这些没用到的模块就不再被打包。换句话说，即便这些没有用到的模块中存在一些副作用代码，我们也可以通过 package.json 中的 sideEffects 去强制声明没有副作用。
