# SegmentTab 分段器
----------

### 组件名
SegmentTab

### 组件描述
用作显示不同视图的显示，iOS推荐组件

### 组件用途
每个页面最多一个，文字精简且最好字数相同，最多5个标签

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {InkTab} from 'apollo-mobile';

export default class SegmentTabDemo extends PureComponent {

  render() {
	return (
		<div>
			<SegmentTab>
	          <SegmentTab.Panel tab="第一项" key="1">第一项内容</SegmentTab.Panel>
	          <SegmentTab.Panel tab="第二项" key="2">第二项内容</SegmentTab.Panel>
	          <SegmentTab.Panel tab="第三项" key="3">第三项内容</SegmentTab.Panel>
	          <SegmentTab.Panel tab="第三项" key="4">第四项内容</SegmentTab.Panel>
	        </SegmentTab>
	        <br/>
	        <SegmentTab>
	          <SegmentTab.Panel tab="第一项" key="1">第一项内容</SegmentTab.Panel>
	          <SegmentTab.Panel tab="禁用" key="2" disabled>第二项内容</SegmentTab.Panel>
	          <SegmentTab.Panel tab="第三项" key="3">第三项内容</SegmentTab.Panel>
	        </SegmentTab>
		</div>
	)
  }
}
```




### API

#### SegmentTab

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

  





 




