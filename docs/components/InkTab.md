# InkTab 切换标签
----------

### 组件名
InkTab

### 组件描述
标签切换

### 组件用途
用于大块区域的信息隐藏，通过标签做切换

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {InkTab} from 'apollo-mobile';

export default class InkTabDemo extends PureComponent {

  render() {
	return (
		<div>
			<InkTab>
	          <InkTab.Panel tab="第一项" key="1">第一项内容</InkTab.Panel>
	          <InkTab.Panel tab="第二项" key="2">第二项内容</InkTab.Panel>
	          <InkTab.Panel tab="第三项" key="3">第三项内容</InkTab.Panel>
	        </InkTab>
	        <InkTab position="bottom">
		      <InkTab.Panel tab="第一项" key="1">第一项内容</InkTab.Panel>
	          <InkTab.Panel tab="第二项" key="2">第二项内容</InkTab.Panel>
	          <InkTab.Panel tab="第三项" key="3">第三项内容</InkTab.Panel>
	        </InkTab>
        <br/>
	        <InkTab defaultActive="3">
	          <InkTab.Panel tab="第一项" key="1">第一项内容</InkTab.Panel>
	          <InkTab.Panel tab="第二项" key="2" disabled>第二项内容</InkTab.Panel>
	          <InkTab.Panel tab="第三项" key="3">第三项内容</InkTab.Panel>
	        </InkTab>
		</div>
	)
  }
}
```




### API

#### InkBar

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| animation    |   boolean |  是否开启动画 |true|
| position    |  string |  Panel位置，包括(top, bottom)|top|
| onChange    |   function |  change事件回调函数，入参为切换的panel的key|-|
| activeKey    |   string |  选中的panel的key|-|
| defaultActiveKey  |   string | 初始化选中的panel的key|-|



#### InkBar.Panel

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| key    |   string |  当前panel唯一key值|-
| tab    |   string or jsx |  标签名 |-|  
| disabled    |   boolean |  是否禁用此panel |false| 

  





 




