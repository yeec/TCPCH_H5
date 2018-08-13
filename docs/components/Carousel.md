#  Carousel 跑马灯
----------

### 组件名
Carousel

### 组件描述
跑马灯，轮播图

### 组件用途
一般用于广告展示，展示信息都是同一层级，默认自动循环滚动

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Carousel} from 'apollo-mobile';

export default class BadgeDemo extends PureComponent {
  
  render() {
	return (
		<Carousel>
          <img
            style={{height:200,display:'block',width:'100%'}}
            src="http://firefly.cmbc.com.cn/h5/images/cmbc.png"
            onClick={()=>{alert(1)}}
          />
          <img
            style={{height:200,display:'block',width:'100%'}}
            src="http://firefly.cmbc.com.cn/h5/images/cmbc.png"
            onClick={()=>{alert(1)}}
          />
        </Carousel>
	)
  }
}
```


#### 点击
```javascript
onClickHandle = (index) => {
    return () => {
      alert(index);
    }
  }

carouselRender = () => {
    const arr = ['http://firefly.cmbc.com.cn/h5/images/cmbc.png','http://firefly.cmbc.com.cn/h5/images/cmbc.png','http://firefly.cmbc.com.cn/h5/images/cmbc.png'];
    return arr.map((item,index) => {
      return (
        <img
          style={{height:200,display:'block',width:'100%'}}
          src={item}
          onClick={this.onClickHandle(index)}
          key={index}
        />
      )
    });
 }
 
render() {
	return (
		<Carousel>
          {this.carouselRender()}
        </Carousel>
	)
}
```



### API

#### Carousel

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| autoplay    |   boolean |  是否自动播放 |true|
| autoplaySpeed    |   number |  自动播放间隔时间(ms) |10000|
| speed    |   number |  切换时间(ms) |500|


> 更具体的用法可以参见 [react-slick](https://github.com/akiran/react-slick)
 




