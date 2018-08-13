var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

//入口配置文件引入
var entrys = require('./app/entrys/config/transfer.js')
var fs = require('fs');
let entryList = {};
var devConfig = {
    //入口配置
    entry: entryList,
    //出口配置
    output: {
        path: __dirname + "/build/",
        filename: "[name].js",
        // publicPath: '../'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', ],
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
                // 样式文件处理 ***** 新增 CSS压缩、补全 *****!postcss-loader!
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!postcss-loader!less-loader')
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url?limit=8192&name=static/images/[hash:8].[name].[ext]'
                // 大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。
            }
        ]
    },

    eslint: {
        configFile: '.eslintrc' // Rules for eslint
    },
    plugins: [
        //热加载
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
            url: 'http://192.168.1.112:9999'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),

        // 新增 ***** 生成对应的样式文件
        new ExtractTextPlugin('[name].[chunkhash:8].css'),

    ],
    // 配置代理服务器
    devServer: {
        host: '192.168.1.112',
        port: 9999,
        proxy: {
            // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
            '/mock': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
    }
}

// entry入口*************************
let entryName = [];
for (var item in entrys) {
    serverList = [
        'webpack-dev-server/client?http://192.168.1.112:9999',
        'webpack/hot/dev-server',
        entrys[item][0]
    ]
    entryName.push(item);
    entryList[item] = serverList;
}
// html页面入口-打包压缩*************************
entryName.forEach(function (item) {
    devConfig.plugins.push(new HtmlWebpackPlugin({
        title: 'mlp',
        template: __dirname + '/app/entrys/index.dev.tmpl.html',
        filename: item + '.html',
        chunks: [item],
        inject: 'body'
    }))
})
module.exports = devConfig;