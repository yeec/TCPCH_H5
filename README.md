## 运行命令
```javascript
npm start 		//开发环境启动
npm run mock 	//模拟数据启动
npm run build 	//生产版本打包

```
## 文件目录
| **目录\文件名称**      |    **说明**   | 
| :-------- | :--------|
| app  | 项目工程目录 | 
| docs | 项目文档目录 | 
| mock | 项目假数据模拟 | 
| package.json | 项目应用插件管理 | 
| webpack.confing.js|  开发配置文件 | 
| webpack.production.config.js | 生产配置文件 |

##devDependencies 开发依赖

```javascript
// 前缀补全
"autoprefixer": "^6.4.0", 
// 代码编译
"babel-core": "^6.14.0",  
"babel-loader": "^6.2.5",
"babel-plugin-react-transform": "^2.0.2",
"babel-preset-es2015": "^6.14.0",
"babel-preset-react": "^6.11.1",
// 引入样式
"css-loader": "^0.24.0",	
// 代码检测		
"eslint": "^3.4.0",					
"eslint-loader": "^1.5.0",	
// 抽离样式		
"extract-text-webpack-plugin": "^1.0.1", 
// 文件处理（图片）
"file-loader": "^0.9.0",
// html模板
"html-webpack-plugin": "^2.22.0",
// 国际化
"i18n-webpack-plugin": "^0.2.7",
// 引入json
"json-loader": "^0.5.4",
// mock假数据
"koa": "^1.2.2",
"koa-router": "^5.4.0",
// less文件编译
"less": "^2.7.1",
"less-loader": "^2.2.3",
// 自动打开浏览器
"open-browser-webpack-plugin": "0.0.2",
// 格式化样式
"postcss-loader": "^0.11.0",


// react热替换
"react-transform-hmr": "^1.0.4",
// 样式引入
"style-loader": "^0.13.1",
// 文件处理
"url-loader": "^0.5.7",
// webpack
"webpack": "^1.13.2",
"webpack-dev-server": "^1.15.0"
```
## dependencies 生产依赖
```javascript
// es6 promise 
"es6-promise": "^3.2.1",
"immutable": "^3.8.1",
// 弹出窗口
"rc-dialog": "^6.3.0",
// 弹出消息
"rc-notification": "^1.3.5",
// react
"react": "^15.3.1",
// react优化
"react-addons-css-transition-group": "^15.3.1",
"react-addons-pure-render-mixin": "^15.3.1",
"react-dom": "^15.3.1",
"react-redux": "^4.4.5",
"react-router": "^2.7.0",
// 触摸事件
"react-tappable": "^0.8.3",
"redux": "^3.5.2",

// 数据交互
"whatwg-fetch": "^1.0.0"
```
