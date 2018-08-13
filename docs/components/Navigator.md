# Navigator 导航栏
----------

### 组件名
Navigator

### 组件描述
位于内容区上方，展示当前内容区简要说明并提供导航能力

### 组件用途
用作导航头，应该避免过多元素填满导航栏

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Navigator，Icon} from 'apollo-mobile';

export default class NavigatorDemo extends PureComponent {

  render() {
	return (
		<div>
			<Navigator>默认</Navigator>
	        <br/>
	        <Navigator type="light">light</Navigator>
	        <br/>
	        <Navigator type="dark">dark</Navigator>
	        <br/>
	        <Navigator back>有返回</Navigator>
	        <br/>
	        <Navigator leftText="左边文字" leftIcon="back" rightText="右边文字" rightIcon="right-arrow-light">文字+图标</Navigator>
	        <br/>
	        <Navigator back leftTap={()=>{alert('点点点')}}>点左边试试</Navigator>
		</div>
	)
  }
}
```

#### 自定义
```javascript
import React, {PureComponent} from 'react';
import {Navigator，Icon} from 'apollo-mobile';

export default class NavigatorDemo extends PureComponent {

  render() {
	return (
		<Navigator 
          leftContent={
            <div style={{display:'flex', alignItems:'center',height:'100%'}}><img src="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg" style={{width:32}}/></div>
          }
          rightContent= {
            <span>
              <Icon type="success"/>
              <Icon type="error"/>
            </span>
          }
        >
          <span style={{color:'yellow'}}>自定义</span>
        </Navigator>
	)
  }
}
```



### API

#### Navigator

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| leftText    |   string or jsx |  左边文字|-|
| leftIcon    |  string or jsx |  左边图标|-|
| leftTap    |   function|  左边点击回调|-|
| rightText    |   string or jsx |  右边文字|-|
| rightIcon    |  string or jsx |  右边图标|-|
| rightTap    |   function|  右边点击回调|-|
| back    |   boolean |  是否显示回退，为true时leftText和leftIcon不可用|false|
| type  |   string | 类型(dark','light','default')|default|
| leftContent    |   jsx |  左边内容，设置此值leftText和leftIcon不可用|-|
| rightContent  |   jsx | 左边内容，设置此值rightText和rightIcon不可用|-|



  





 




