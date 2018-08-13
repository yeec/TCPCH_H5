#  Switch 开关
----------

### 组件名
Switch

### 组件描述
开关，两个互斥对象进行选择

### 组件用途
用于开关

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Switch} from 'apollo-mobile';

export default class SwitchDemo extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      switch1Checked: false
    };
  }

  changeHandle = (checked) => {
    this.setState({
      switch1Checked:checked
    })
  };
  
  render() {
	return (
		<Switch value={this.state.switch1Checked} onChange={this.changeHandle}/>
	)
  }
}
```

#### Switch列表
```javascript
render() {
	
	return (
		<Cell.Group>
          <Switch.SwitchList title="禁用关" switchProps={{disabled:true}}/>
          <Switch.SwitchList title="禁用开" switchProps={{disabled:true,value:true}}/>
          <Switch.SwitchList title="开关" switchProps={{defaultValue:true}}/>
          <Switch.SwitchList title="开关" switchProps={{defaultValue:true,onChange:(arg)=>{console.log(arg)}}}/>
        </Cell.Group>
	)
  }
```


### API

#### Switch

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| value    |   boolean |  是否选中 |-|
| defaultValue    |   boolean |  初始是否选中 |-|
| disabled    |   boolean |  是否禁用|false|
| onChange    |   function |  change事件回调函数，入参为(value,event)|-|
| name    |   string | 同html中name|-|



#### Checkbox.Agree
同Checkbox

#### Switch.SwitchList 
| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| switchProps    |   object |  多选的属性配置，同Switch |{}|
 其他属性同Cell





 




