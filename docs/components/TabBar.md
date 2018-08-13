# TabBar 标签栏
----------

### 组件名
TabBar

### 组件描述
标签栏，位于底部

### 组件用途
标签栏，位于底部

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {TabBarDemo} from 'apollo-mobile';

export default class InkTabDemo extends PureComponent {

  render() {
	return (
		<TabBar defaultActiveKey="1">
          <TabBar.Panel icon="success" text="tab1" key="1">tab1内容</TabBar.Panel>
          <TabBar.Panel icon="success" text="tab1" key="2">tab2内容</TabBar.Panel>
          <TabBar.Panel icon="success" text="tab1" key="3" disabled>tab3内容</TabBar.Panel>
          <TabBar.Panel icon="success" text="tab1" key="4">tab4内容</TabBar.Panel>
        </TabBar>
	)
  }
}
```

#### 小红点
```javascript
import React, {PureComponent} from 'react';
import {TabBarDemo} from 'apollo-mobile';

export default class InkTabDemo extends PureComponent {

  render() {
	return (
		<TabBar defaultActiveKey="1">
          <TabBar.Panel icon="success" text="tab1" key="1">tab1内容</TabBar.Panel>
          <TabBar.Panel icon="success" text="tab1" key="2" hasBadge>tab2内容</TabBar.Panel>
          <TabBar.Panel icon="success" text="tab1" key="3" hasBadge badgeType="text" badgeText="NEW">tab3内容</TabBar.Panel>
          <TabBar.Panel icon="success" text="tab1" key="4" hasBadge badgeType="text" badgeText={100}>tab4内容</TabBar.Panel>
        </TabBar>
	)
  }
}
```


#### 自定义
```javascript
import React, {PureComponent} from 'react';
import {TabBarDemo} from 'apollo-mobile';

export default class InkTabDemo extends PureComponent {

  render() {
	return (
		<TabBar defaultActiveKey="1">
          <TabBar.Panel tab={<div style={{display:'flex', alignItems:'center'}}><img src="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg" style={{width:40}}/></div>} key="1" >tab1内容</TabBar.Panel>
          <TabBar.Panel tab={<div style={{display:'flex', alignItems:'center',height:'100%'}}><img src="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg" style={{width:40}}/></div>} key="2" >tab2内容</TabBar.Panel>
          <TabBar.Panel tab={<div style={{display:'flex', alignItems:'center',height:'100%'}}><img src="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg" style={{width:40}}/></div>} key="3" >tab3内容</TabBar.Panel>
          <TabBar.Panel tab={<div style={{display:'flex', alignItems:'center',height:'100%'}}><img src="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg" style={{width:40}}/></div>} key="4" >tab4内容</TabBar.Panel>
        </TabBar>
	)
  }
}
```




### API

#### InkBar

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| animation    |   boolean |  是否开启动画 |true|
| onChange    |   function |  change事件回调函数，入参为切换的panel的key|-|
| activeKey    |   string |  选中的panel的key|-|
| defaultActiveKey  |   string | 初始化选中的panel的key|-|



#### InkBar.Panel

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| key    |   string |  当前panel唯一key值|-
| tab    |   string or jsx |  标签名 |-|  
| disabled    |   boolean |  是否禁用此panel |false| 
| icon    |   string or jsx |  icon名称|-|
| text    |   string or jsx |  文字内容 |-|  
| hasBadge    |   boolean |  是否有Badge |false| 
| badgeType    |   string |  参考Badge|-|
| badgeText    |   string or jsx |  参考Badge |-|  
| badgeMaxNum    |   boolean |  参考Badge |99| 

  





 




