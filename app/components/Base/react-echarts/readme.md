#Apollo-React-ECharts
---------------
@(apollo-react)[Author:lsl, Update Time:2016.07.18, Version:1.0.0]
>1.0.0
	> -新建

###模块
echarts的react封装
###特性
*	支持IE 8.0；
*	仅包含title、tooltip、grid三个必需模块；

###限制
依赖于echarts 3.x

###属性


|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|style |否  |object |需要绘制图表dom节点样式|
|className |否 |string | 需要绘制图表dom节点class  |
|theme |否|string | 主题，具体见echarts官网  |
|onReady |否|func | 图表初始化完成后调用函数，入参为图表节点DOM  |
|events|否|object|事件集合，key为事件名称，value为回调函数，入参为params和图表节点DOM，params具体内容请参见echarts官网|
|option |是 |object | echarts图表设置option,具体参见echarts官网|

事例
```javascript
	import React from 'react';
	import { ReactEcharts } from 'apollo-react';
	import 'echarts/lib/chart/bar';
	const option = {
		title: {
		text: 'ECharts 入门示例'
		},
		tooltip: {},
		xAxis: {
		  data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
		},
		yAxis: {},
		series: [{
		    name: '销量',
		    type: 'bar',
		    data: [5, 20, 36, 10, 10, 20]
		}]
	}

	render() {
	    return (
	      <ReactEcharts
	        option={ option }
	        style={{ width: 300, height: 250 }}
	        onReady={ () => {alert('ready!');}}
	        events={{ click: () => {alert('click');} }}
	      />
	    );
   }
```

####Tips
因为echarts包含多种图表和多种组件，全部加载会造成流浪浪费，故本组件只包含title、tooltip、grid三个默认模块；若要绘制xxx图表（例如bar柱状图），请
```javascript
	import 'echarts/lib/chart/xxx';
```
具体xxx值参考echarts的npm包设置；
若要使用除title、tooltip、grid之外的组件yyy（例如legend图例），请
```javascript
	import 'echarts/lib/component/yyy'
```
具体xxx值参考echarts的npm包设置；

`上述import必须在ReactEcharts加载进来后加载进来`

```javascript
	import { ReactEcharts } from 'apollo-react';
	import 'echarts/lib/chart/bar';


	//or
	require('apollo-react/components/react-echarts');
	require('echarts/lib/chart/bar');	
```
