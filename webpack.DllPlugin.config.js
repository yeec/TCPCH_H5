const path = require('path');
var webpack = require('webpack');
const vendors = [
  "accounting-js",
  "core-js",
  "jquery",
  "lib-flexible",
  "moment",
  "prop-types",
  "rc-animate",
  "rc-collapse",
  "rc-notification",
  "rc-tabs",
  "react",
  "react-addons-css-transition-group",
  "react-addons-pure-render-mixin",
  "react-countup",
  "react-dom",
  "react-router",
  "react-slick",
  "react-tappable",
  "rmc-picker",
  "scriptjs",
  "swiper",
  "whatwg-fetch"
];
module.exports = {
  output: {
    path: __dirname + "/static/polyfill",
    filename: "vendor.[name].js",
    library: '[name]',
  },
  entry: {
    "dll": vendors,
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  // 代码检测工具文件引入
  eslint: {
    configFile: '.eslintrc' // Rules for eslint
  },
  // 插件配置
  plugins: [
    new webpack.DllPlugin({
      path: './manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: __dirname, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    // 将React切换到产品环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // JS代码压缩
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false, // remove all comments
      },
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
  ]
}