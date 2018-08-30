// var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");
// var CompressionWebpackPlugin = require("compression-webpack-plugin");

//入口配置文件引入
var entrys = require('./app/entrys/index.js');
// var entrys = require('./app/entrys/config/transfer.js')
var productionConfig = {
  //入口配置
  entry: entrys,
  //出口配置
  output: {
    path: __dirname + "/build/",
    filename: "[name]/index.js",
    publicPath: '../'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
    // alias: {
    //     'react-intl': 'react-intl/dist/react-intl.min',
    //     'intl-zh': 'react-intl/../../locale-data/zh'
    // }
  },

  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        // 样式文件处理 ***** 新增 CSS压缩、补全 *****
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!postcss-loader!less-loader')
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url?limit=1&name=static/images/[name].[ext]'
        // 大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。
      }
    ]
  },
  // 不需要打包的依赖包
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'jquery': '$'
  },
  // 代码检测工具文件引入
  eslint: {
    configFile: '.eslintrc' // Rules for eslint
  },
  // 配置css格式化
  postcss: [
    require('autoprefixer')
  ],
  // 插件配置
  plugins: [
    //忽略引入模块中并不需要的内容
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // JS代码压缩
    new webpack.optimize.UglifyJsPlugin({
      //去掉注释
      comments: false,
      compress: {
        //忽略警告
        warnings: false
      }
    }),
    // DLL文件配置
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./manifest.json'),
    //   name: 'dll'
    // }),
    // 将React切换到产品环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 新增 ***** 生成对应的样式文件
    new ExtractTextPlugin('[name]/style.css'),

    //gzip 压缩
    // new CompressionWebpackPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: new RegExp(
    //     '\\.(js|css)$' //压缩 js 与 css
    //   ),
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),

    //拷贝到打包文件中使用
    new CopyWebpackPlugin([{
      from: __dirname + '/static',
      to: __dirname + '/build/static',
    }]),
    //拷贝favicon.ico到打包文件中使用
    new CopyWebpackPlugin([{
      from: __dirname + '/static/favicon.ico',
      to: __dirname + '/build',
    }]),
    //拷贝menuIcon到打包文件中使用
    // new CopyWebpackPlugin([{
    //   from: __dirname + '/static/menuIcon',
    //   to: __dirname + '/build/menuIcon',
    // }]),
  ]
}
// entry入口*************************
let entryList = [];
for (var item in entrys) {
  entryList.push(item);

}
// html页面入口-打包压缩*************************
entryList.forEach(function (item) {
  // console.log(item)
  productionConfig.plugins.push(new HtmlWebpackPlugin({
    title: 'mlp',
    template: __dirname + '/app/entrys/index.build.tmpl.html',
    filename: item + "/index.html",
    chunks: [item],
    inject: 'body',
    // 新增 ***** 移除属性的引号,压缩HTML
    minify: {
      removeComments: true, //去注释
      collapseWhitespace: true, //压缩空格
      removeAttributeQuotes: true //去除属性引用
    },
    //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
    chunksSortMode: 'dependency'
  }))
})
module.exports = productionConfig;