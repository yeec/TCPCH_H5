#  Checkbox 多选框
----------

### 组件名
Checkbox

### 组件描述
多选

### 组件用途
多选，一般处在左侧

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Checkbox} from 'apollo-mobile';

export default class BadgeDemo extends PureComponent {

  changeHandle = (checked) => {
    console.log(checked);
  };
  
  render() {
	return (
		<div>
			禁用状态<Checkbox value={true} onChange={this.changeHandle} disabled/>
	        默认状态<Checkbox onChange={this.changeHandle}/>
		</div>
	)
  }
}
```

#### 同意组件
```javascript
constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
}

changeHandle = (checked) => {
    this.setState({checked});
};

render() {
	
	return (
		<div>
          <Checkbox.Agree>
            同意
          </Checkbox.Agree>
          <Checkbox.Agree value={this.state.checked} onChange={this.changeHandle}>
            是否同意<a style={{color:'#2db7f5'}}>《信用支付服务合同信用支付服务合同信用支付服务合同》</a>
          </Checkbox.Agree>
        </div>
	)
  }
```


#### 多选组
```javascript
render() {

	return (
		<Cell.Group>
          <Checkbox.CheckboxList title="选项1 禁用" checkboxProps={{disabled: true}}/>
          <Checkbox.CheckboxList title="选项2 禁用" checkboxProps={{disabled: true,value:true}}/>
	      <Checkbox.CheckboxList title="选项3" onTap={(checked)=>{console.log(checked)}}/>
          <Checkbox.CheckboxList title="选项4" checkboxProps={{defaultValue:true}}/>
        </Cell.Group>
	)
}
```


### API

#### Checkbox

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| value    |   boolean |  是否选中 |-|
| defaultValue    |   boolean |  初始是否选中 |-|
| disabled    |   boolean |  是否禁用|false|
| onChange    |   function |  change事件回调函数，入参为(value,event)|-|
| name    |   string | 同html中name|-|



#### Checkbox.Agree
同Checkbox

#### Checkbox.CheckboxList 
| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| checkboxProps    |   object |  多选的属性配置，同Checkbox |{}|
| onTap    |   function |  change事件回调函数，入参为(value,event) |-|  

  
  其他属性同Cell





 




