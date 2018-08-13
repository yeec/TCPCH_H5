# Modal 模态框
----------

### 组件名
Modal

### 组件描述
模态框。弹窗提示用户，获得用户反馈

### 组件用途
弹窗提示用户， 标题简明，alert多于三个按钮建议用actionsheet，希望用户点击的按钮一般放置在左侧。

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Modal, Button} from 'apollo-mobile';

export default class ModalDemo extends PureComponent {
 constructor() {
    super();
    this.state = {
      modalVisible: false,
      modalVisible1: false,
      modalVisible2: false,
    }
 }
 
 modalHandle = () => {
    let modalVisible = !this.state.modalVisible;
    this.setState({modalVisible});
  }

  modalHandle1 = () => {
    let modalVisible1 = !this.state.modalVisible1;
    this.setState({modalVisible1});
  }

  modalHandle2 = () => {
    let modalVisible2 = !this.state.modalVisible2;
    this.setState({modalVisible2});
  }

  render() {
	return (
		<div>
		  <p>popup形式</p>
          <Button onTap={this.modalHandle}>点我开启</Button>
          <Modal visible={this.state.modalVisible}>
            <Button onTap={this.modalHandle}>点我关闭</Button>
          </Modal>

          <p>alert形式</p>
          <Button onTap={this.modalHandle1}>点我开启</Button>
          <Modal visible={this.state.modalVisible1} type="alert">
            <Button onTap={this.modalHandle1}>点我关闭</Button>
          </Modal>

          <p>全屏</p>
          <Button onTap={this.modalHandle2}>点我开启</Button>
          <Modal visible={this.state.modalVisible2} fullScreen>
            <Button onTap={this.modalHandle2}>点我关闭</Button>
          </Modal>
		</div>
	)
  }
}
```



#### alert
```javascript
import React, {PureComponent} from 'react';
import {Modal, Button} from 'apollo-mobile';

export default class ModalDemo extends PureComponent {
 
  alertHandle = () => {
    Modal.alert('我弹弹弹')
  }

  alertHandle1 = () => {
    Modal.alert('1个button',[{text:'点我试试'}])
  }

  alertHandle2 = () => {
    Modal.alert('2个button',[{text:'点我试试'},{text:'试试就试试'}])
  }

  alertHandle3 = () => {
    Modal.alert('多个button',[{text:'点我试试'},{text:'试试就试试'},{text:'你猜我是谁?'}])
  }
  render() {
	return (
		<div>
		  <Button onTap={this.alertHandle}>默认</Button>
          <Button onTap={this.alertHandle1}>自定义1个按钮</Button>
          <Button onTap={this.alertHandle2}>自定义2个按钮</Button>
          <Button onTap={this.alertHandle3}>自定义3个按钮</Button>
		</div>
	)
  }
}
```


#### alert
```javascript
import React, {PureComponent} from 'react';
import {Modal, Button} from 'apollo-mobile';

export default class ModalDemo extends PureComponent {
 
  actionsheetHandle = () => {
    Modal.actionsheet({
      items: ['第一项','第二项','第三项','第四项','取消'],
      titleText: '这是title',
      cancelIndex: 4
    }, function (key) {
      console.log(key)
    });
  }
  
  render() {
	return (
		<Button onTap={this.actionsheetHandle}>actionsheet</Button>
	)
  }
}
```




### API

#### Modal

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| type    |   string |  模态框类型（popup, alert） |popup|
| fullScreen    |  boolean |  是否全屏，alert模式强制不全屏|false|
| onClose    |   function |  模态框关闭时调用函数|-|
| visible    |   boolean |  是否可见|false|



#### Modal.alert
弹框函数

```javascript
/**
*content为弹框内容，必需
*items为弹框的动作按钮数组，非必须，Array类型，每项格式为
*	{
*		text: '按钮名称', //string or jsx
*		onTap: func, //function 按钮点击的回调函数
*	}
*当items元素内容大于2个，按钮竖直排列
*/
Modal.alert(content, items)
```



#### Modal.actionsheet
动作面板函数

```javascript
/**
*options动作面板配置，必须。
*items为弹框的动作按钮数组，非必须，Array类型，每项格式为
*	{
*		items: [...args], //数组内容可为string or jsx, 表示动作面板每个动作条显示，必需
*		titleText: 'title', //动作面板标题
*		cancelIndex: number, //number, 取消按钮在items中的index，非必需
*	}
*callback动作面板点击回调，入参为点击的动作条在items中的index
*/
Modal.actionsheet(options, callback)
```


  





 




