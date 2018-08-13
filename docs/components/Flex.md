#  Flex Flex布局
----------

### 组件名
Flex

### 组件描述
弹性布局

### 组件用途
布局时使用

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Flex} from 'apollo-mobile';

export default class FlexDemo extends PureComponent {
  
  render() {
	return (
		<Flex>
            <Button>2个</Button>
            <Button>2个</Button>
        </Flex>
	)
  }
}
```

#### 纵向
```javascript
render() {
	
	return (
		<Flex direction="column">
            <Button>2个</Button>
            <Button>2个</Button>
        </Flex>
	)
  }
```


#### 不同大小
```javascript
render() {

	return (
		<div>
          <p>比例大小</p>
          <Flex>
            <Flex.Item size={2}><Button>2个</Button></Flex.Item>
            <Flex.Item><Button>2个</Button></Flex.Item>
          </Flex>
          <p>某个item固定大小</p>
          <Flex>
            <Flex.Item style={{width:70}}><Button>2个</Button></Flex.Item>
            <Flex.Item><Button>3个</Button></Flex.Item>
            <Flex.Item><Button>3个</Button></Flex.Item>
          </Flex>
        </div>
	)
}
```

#### 换行
```javascript
render() {

	return (
		<div>
          <p>9个small button, 默认不换行</p>
          <Flex>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
          </Flex>
          <p>9个small button, 换行</p>
          <Flex wrap="wrap">
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
          </Flex>
        </div>
	)
}
```

#### 主轴对齐
```javascript
render() {

	return (
		<div>
          <p>start: 左对齐</p>
          <Flex>
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>end: 右对齐</p>
          <Flex justify="end">
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>center: 居中</p>
          <Flex justify="center">
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>between: 两端对齐</p>
          <Flex justify="between">
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>around: 间隔对齐</p>
          <Flex justify="around">
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
        </div>
	)
}
```

#### 交叉轴对齐
```javascript
render() {

	return (
		<div>
          <p>start(默认): 交叉轴起点对齐</p>
          <Flex>
            <Button style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>end: 交叉轴终点对齐</p>
          <Flex align="end">
            <Button style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>center: 交叉轴中点对齐</p>
          <Flex align="center">
            <Button style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>baseline: 第一行文字基线</p>
          <Flex align="baseline">
            <Button style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
          <p>stretch: 拉伸对齐</p>
          <Flex align="stretch">
            <Button style={{margin:0}}>2个</Button>
            <Button size="small" style={{margin:0}}>2个</Button>
          </Flex>
        </div>
	)
}
```

#### 换行
```javascript
render() {

	return (
		<div>
          <p>9个small button, 默认不换行</p>
          <Flex>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
          </Flex>
          <p>9个small button, 换行</p>
          <Flex wrap="wrap">
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
            <Button size="small">2个</Button>
          </Flex>
        </div>
	)
}
```


### API

#### Flex

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| direction    |   string |  row（水平方向，起点在左端), row-reverse（水平方向，起点在右端), column（垂直方向，起点在上沿), column-reverse（垂直方向，起点在下沿) |row|
| wrap    |  string  |  nowrap（不换行）, wrap（换行，第一行在上方）, wrap-reverse（换行，第一行在下方） |nowrap|
| justify    |   string |  主轴对齐方式：start, end, center, between, around|start|
| align    |   string | 交叉轴对齐：'start', 'end', 'baseline', 'center', 'stretch'|start|

#### Flex.Item
| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| size    |   number | Flex布局下元素的比例大小 |1|







 




