#  Radio 单选框
----------

### 组件名
Radio

### 组件描述
单选

### 组件用途
多个选项互斥时使用，一般在列表右侧

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Radio} from 'apollo-mobile';

export default class RadioDemo extends PureComponent {

  changeHandle = (checked) => {
    console.log(checked);
  };
  
  render() {
	return (
		<div>
			禁用状态
			<Radio defaultValue={true} onChange={this.changeHandle} disabled/>
	        默认状态
	        <Radio onChange={this.changeHandle} name="radio1"/>
	        <Radio onChange={this.changeHandle} name="radio1"/>
		</div>
	)
  }
}
```

#### Radio组
```javascript
render() {
	
	return (
		<Radio.Group onChange={(key) => {console.log(key)}} defaultActiveKey="0">
          <Radio key="0"/>
          <Radio key="1"/>
        </Radio.Group>
	)
  }
```


#### Radio列表
```javascript
render() {

	return (
		<Cell.Group>
          <Radio.RadioList title="选项1 禁用" radioProps={{disabled: true}} onTap={(arg) => {console.log(arg)}}/>
          <Radio.RadioList title="选项2 禁用" radioProps={{disabled: true,value:true}}/>
          <Radio.RadioList title="选项3" onTap={(arg) => {console.log(arg)}} radioProps={{name:'1'}}/>
          <Radio.RadioList title="选项3" radioProps={{defaultValue:true,name:'1'}} onTap={(arg) => {console.log(arg)}}/>
        </Cell.Group>
	)
}
```


### API

#### Radio

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| value    |   boolean |  是否选中 |-|
| defaultValue    |   boolean |  初始是否选中 |-|
| disabled    |   boolean |  是否禁用|false|
| onChange    |   function |  change事件回调函数，入参为(value,event)|-|
| name    |   string | 同html中name|-|



#### Radio.Group
| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| defaultActiveKey    |   string |  初始选中的key值 |-|
| onChange    |   function |  change事件回调函数，入参为选中的key值 |-|  

#### Radio.RadioList
| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| radioProps    |   object |  单选的属性配置，同Radio |{}|
| onTap    |   function |  change事件回调函数，入参为(value,event) |-|  

  
  其他属性同Cell





 




