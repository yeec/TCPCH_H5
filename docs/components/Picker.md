#  Picker 选择器
----------

### 组件名
Picker

### 组件描述
弹出式滚动单选组件

### 组件用途
提供一组预设值让用户选择, 避免用户输入

### 代码示例

#### Cell模式
```javascript
import {Picker} from 'apollo-mobile';
import district from '../data/district';

export default class PickerDemo extends Component {
  
  onPickerChange = (value) =>{
    console.log(`onPickerChange:{$value}`);
  };

  onPickerValueChange = (value) =>{
    console.log(`onPickerValueChange:{$value}`);
    this.setState({
      pickerValue: value,
    })
  };

  render() {
	return (
	 <Picker cellTitle="旅游地区" 
	         placeholder="请选择" data={district} title="选择地区"
             onPickerChange={this.onPickerChange}
             onChange={this.onPickerValueChange} value={this.state.pickerValue}/>
	)
  }
}
```


#### 手动控制
```javascript
constructor() {
    super();
    this.state = {
      pickerVisible: false,
    };
}

  showPicker () {
    this.setState({
      pickerVisible: true,
    })
  };
  
render() {
	return (
	    <div>
	        <Picker data={district} title="选择地区"
                    onPickerChange={this.onPickerChange} visible={this.state.pickerVisible}
                    onChange={this.onPickerValueChange} value={this.state.pickerValue} 
                    onVisibleChange={this.onPickerVisibleChange} showCell={false}/>
            <div style={{padding:15}}>
                <Button onTap={this.showPicker}>打开Picker</Button>
            </div>
        </div>
	)
}
```



### API


| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| format    |   function |  格式化返回结果,从数组转为字符串. 方法接收参数是选择的value数组, 方法需要返回一个字符串 | 默认返回values.join(',') |
|cols|  number | 多级选择器的显示列数 | 3 |
|value| array | 选择值| - | 
|data| array | 预设值供选择, 结构需要符合{ "value": "340000", "label": "安徽省", "children":[{"value":...}]}| - | 
|okText| string | 弹出选择器, 确定的文本显示 | 确定 |
|dismissText| string | 弹出选择器, 取消的文本显示 | 取消 |
|title| string | 弹出选择器, 标题文本 | - |
|showCell| bool | 是否显示cell | - | 
|placeholder| string | cell显示时, 在没有选择任何value的时候, 默认显示值 | - | 
|cellTitle| string | cell显示时, 标题文本 | - |
|onPickerChange|  function | 弹出选择器, 滚动选中回调, 传入参数选中value | - |
|onChange|  function | 弹出选择器, 确定选择回调, 传入参数选中value | - |
|onVisibleChange|  function | 手动控制弹出选择器visible的回调, 传入visible变化的值 true/false| - |
|visible|  function | 手动控制弹出选择器当前visible true/false | false |





