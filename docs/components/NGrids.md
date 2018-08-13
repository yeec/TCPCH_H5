# NGrids N宫格
----------

### 组件名
NGrids

### 组件描述
N宫格，将区域按照块级划分，一般为图标加文字

### 组件用途
一般用作菜单

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {InkTab} from 'apollo-mobile';

export default class NGridsDemo extends PureComponent {
  createGridsData = (data, length) => {
    return new Array(length).fill(data);
  }
  
  render() {
	return (
		<div>
			<NGrids data={this.createGridsData({content:'hehe'},16)}/>
		</div>
	)
  }
}
```

#### 分页
```javascript
import React, {PureComponent} from 'react';
import {InkTab} from 'apollo-mobile';

export default class NGridsDemo extends PureComponent {
  createGridsData = (data, length) => {
    return new Array(length).fill(data);
  }
  
  render() {
	return (
		<div>
			<NGrids data={this.createGridsData({content:'hehe'},16)} column={3}/>
		</div>
	)
  }
}
```
> row * column （默认为4）小于 data的长度时自动分页

#### 文字+图标
```javascript
import React, {PureComponent} from 'react';
import {InkTab} from 'apollo-mobile';

export default class NGridsDemo extends PureComponent {
  createGridsData = (data, length) => {
    return new Array(length).fill(data);
  }
  
  render() {
	return (
		<div>
			<NGrids 
				data={this.createGridsData({
		          text: '民生银行',
		          icon: <Icon type="cmbc"/>
		        },12)}
	        />
		</div>
	)
  }
}
```

#### 无border
```javascript
import React, {PureComponent} from 'react';
import {InkTab} from 'apollo-mobile';

export default class NGridsDemo extends PureComponent {
  createGridsData = (data, length) => {
    return new Array(length).fill(data);
  }
  
  render() {
	return (
		<div>
			<NGrids 
				data={this.createGridsData({
		          text: '民生银行',
		          icon: <Icon type="cmbc"/>
		        },12)}
		        border={false} 
		        onTap={(data,index)=>{console.log(data);console.log(index)}}
	        />
		</div>
	)
  }
}
```


### API

#### NGrids

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| row    |   number |  行数 |-|
| column    |  number |  列数|4|
| onTap    |   function(el,index) |  点击回调|-|
| border    |   boolean |  是否有边框|-|
| data  |   array | 传入的菜单数据|-|

```javascript
//data每一项元素为一个object
{
	icon: 图标 // string or jsx string为img的url
	text: 文字  //string or jsx
	iconStyle: {} //图标的style
	textStyle: {} //文字的style
	content: 内容 //string or jsx 如果有content这个key值，那么自动忽略icon及text。格内展示位{content}
}
```

  





 




