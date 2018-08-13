#  Card 卡片
----------

### 组件名
Card

### 组件描述
卡片组件，展现某一类信息

### 组件用途
用于组织信息和操作，通常也作为详细信息的入口

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Card} from 'apollo-mobile';

export default class BadgeDemo extends PureComponent {
  
  render() {
	return (
		<Card style={{width:'80%',margin:'auto'}}>
          <Card.Header content="Card头content" description="Card头description"/>
          <Card.Body>
            正文
          </Card.Body>
          <Card.Footer content="Card脚content" description="Card脚description" />
        </Card>
	)
  }
}
```


#### 缩略图
```javascript
render() {
	return (
		<Card style={{width:'80%',margin:'auto'}}>
          <Card.Header content="Card头content" description="Card头description" thumb="http://firefly.cmbc.com.cn/h5/images/cmbc.png"/>
          <Card.Body>
            正文
          </Card.Body>
          <Card.Footer content="Card脚content" description="Card脚description" />
        </Card>
	)
}
```

#### 微信订阅号demo
```javascript
render() {
	return (
		<Card style={{width:'80%',margin:'auto',backgroundColor:'#fff'}}>
          <Card.Header
            content={
              <span>
              Apollo 移动端框架 1.0 released!
              <p style={{color:'#999',fontSize:12}}>10月1号</p>
              </span>
            }
          />
          <Card.Body>
            <img src="http://firefly.cmbc.com.cn/h5/images/cmbc.png" style={{width:'100%',height:200,display:'block'}}/>
            <p style={{color:'#999',fontSize:14}}>
              Apollo 移动端框架 1.0 released! Apollo 移动端框架 1.0 released! Apollo 移动端框架 1.0 released! Apollo 移动端框架 1.0 released! Apollo 移动端框架 1.0 released!
            </p>
          </Card.Body>
          <Card.Footer content="阅读全文" description=">"/>
        </Card>
	)
 }
```




### API

#### Card

无

#### Card.Header

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| content    |   string or jsx |  卡片头主内容 |-|
| description    |   string or jsx |  卡片头描述内容 |-|
| thumb    |   string or jsx |  卡片头说略图，可以传递图片url或者JSX |-|
| contentSize    |  number |  卡片头主内容与描述的占宽比值 |1|
| descriptionSize    |   number |  卡片头主内容与描述的占宽比值 |1|


#### Card.Body
无

#### Card.Footer 

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| content    |   string or jsx |  卡片脚主内容 |-|
| description    |   string or jsx |  卡片脚描述内容 |-|
| contentSize    |  number |  卡片脚主内容与描述的占宽比值 |1|
| descriptionSize    |   number |  卡片脚主内容与描述的占宽比值 |1|

 




