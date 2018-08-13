#  Button 按钮
----------

### 组件名
Button

### 组件描述
就是按钮啦

### 组件用途
需要点点点的时候用，每个页面从理论上讲有且只有一个主按钮

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Button, Cell} from 'apollo-mobile';

export default class BadgeDemo extends PureComponent {
  
  onTapHandle = (arg) => {
    return () => {
      alert(arg);
    }
  }
  
  render() {
	return (
		<div style={{padding:'0 10px'}}>
          <Button onTap={this.onTapHandle('default')}> default</Button>
          <Button onTap={this.onTapHandle('default')} plain> default</Button>
          <Button onTap={this.onTapHandle('default')} disabled> default disabled</Button>
          <Button onTap={this.onTapHandle('primary')} type="primary"> primary</Button>
          <Button onTap={this.onTapHandle('primary')} type="primary" plain> primary</Button>
          <Button onTap={this.onTapHandle('primary')} type="primary" disabled> primary disabled</Button>
          <Button onTap={this.onTapHandle('warn')} type="warn"> warn</Button>
          <Button onTap={this.onTapHandle('warn')} type="warn" plain> warn</Button>
          <Button onTap={this.onTapHandle('warn')} type="warn" disabled> warn disabled</Button>
        </div>
	)
  }
}
```


#### inline
```javascript
render() {
	return (
		<div style={{padding:'0 10px'}}>
          <div>
            <Button inline> default inline</Button>
            <Button inline size="small"> default inline small</Button>
          </div>
          <div style={{marginTop:10}}>
            <Button inline type="primary"> primary inline</Button>
            <Button inline size="small" type="primary"> primary inline small</Button>
          </div>
          <div style={{marginTop:10}}>
            <Button inline type="warn"> warn inline</Button>
            <Button inline size="small" type="warn"> warn inline small</Button>
          </div>
        </div>
	)
}
```

#### 按钮组
```javascript
render() {
	return (
		<div style={{padding:'0 10px'}}>
          <Button.Group horizon>
            <Button>按钮1</Button>
            <Button>按钮2</Button>
            <Button>按钮3</Button>
            <Button>按钮4</Button>
          </Button.Group>
          <Button.Group>
            <Button>按钮1</Button>
            <Button>按钮2</Button>
          </Button.Group>
        </div>
	)
 }
```




### API

#### Button

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| type    |   string |  按钮类型(default,primary,warn) | default|
|size| string  | 按钮大小(small,default) | default |
|plain| boolean | 是否是plain类型，即按钮的ghost形态| false | 
|disabled| boolean | 是否禁用 | false | 
|inline| boolean | 是否是行内按钮，宽度由按钮文字长度决定 | false | 
|onTap| function | 按钮点击函数|- | 


#### Button.Group
| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| horizon    |   boolean |  是否水平展开 | false|

 




