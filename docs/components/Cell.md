#  Cell 列表
----------

### 组件名
Cell

### 组件描述
列表，单个连续模块垂直排列

### 组件用途
用于展示连续模块的垂直排列。分为主要和次要部分。主要居左，次要居右

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Cell} from 'apollo-mobile';



export default class BadgeDemo extends PureComponent {
  
  render() {
	return (
		<div>
			<Cell title="这是标题"/>
	        <Cell title="这是标题" description="这是描述"/>
	        <Cell title="这是标题" subTitle="这是subTitle"/>
	        <Cell title="这是标题" subTitle="这是子标题" description="这是描述" subDescription="这是子描述"/>
	        <Cell title="这是标题" description="这是描述" arrow/>
	        <Cell title="这是标题" description="这是描述" arrow
              thumb="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg"/>
	        <Cell title="这是标题"
              description={<span><img src="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg" style={{width:32,height:32,verticalAlign:'middle'}}/></span>}
              arrow/>
		</div>
	)
  }
}
```

#### 箭头
```javascript
render() {

	return (
		<div>
			<Cell title="默认箭头" description="描述" arrow/>
	        <Cell title="向上箭头" description="描述" arrow="up"/>
	        <Cell title="向下箭头" description="描述" arrow="down"/>
	        <Cell title="空箭头 占位" description="描述" arrow="empty"/>
		</div>
	)
  }
```


#### 点击
```javascript
render() {

	return (
		<Cell title="这是标题" description="这是描述" arrow onTap={()=>{alert('tap!')}}/>
	)
}
```

#### 列表组
```javascript
render() {
	return (
		<Cell.Group header="这是个列表">
          <Cell title="这是标题" description={<span style={{color:'red'}}>这是描述</span>} arrow/>
          <Cell title="这是标题" description={<Button size="small">dddd</Button>} arrow/>
          <Cell title="这是标题" subTitle="这是子标题" description="这是描述" arrow/>
          <Cell title="这是标题" subTitle="这是子标题" description="这是描述" arrow/>
        </Cell.Group>
	)
}
```



### API

#### Cell

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| title    |   string or jsx |  列表标题 |-|
| subTitle    |   string or jsx |  列表子标题 |-|
| description    |   string or jsx |  列表描述 |-|
| subDescription    |   string or jsx |  列表子描述 |-|
| arrow    |   boolean or string |  箭头（'up', 'down', 'right', 'empty'， true）|false|
| thumb    |   string or jsx |  列表缩略图，string默认为图片url |-|
| thumbWidth    |   number |  列表缩略图宽 |-|
| thumbHeight    |   number |  列表缩略图高 |-|
| onTap    |   function |  列表点击事件 |-|


#### Cell.Group
| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| header    |   string or jsx |  列表组标题 |-|




 




