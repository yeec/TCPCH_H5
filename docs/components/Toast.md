# Toast 提示
----------

### 组件名
Toast

### 组件描述
轻量级反馈提示

### 组件用途
轻量级反馈提示

### 代码示例

#### 基本
```javascript
import React, {PureComponent} from 'react';
import {Modal, Button} from 'apollo-mobile';

export default class ModalDemo extends PureComponent {
 successHandle = () => {
    Toast.success('表白成功!');
  }
  errorHandle = () => {
    Toast.error('表白失败!');
  }

  infoHandle = () => {
    Toast.info('她是拉拉!');
  }

  loadingHandle = () => {
    Toast.loading('正在表白中',3, function () {
      Toast.info('她是拉拉!');
    });
  }

  loadingHandle1 = () => {
    Toast.loading('正在表白中');
    setTimeout(function () {
      Toast.hide();
    },3000)
  }

  render() {
	return (
		<div>
		  <Button onTap={this.successHandle}>success</Button>
	      <Button onTap={this.errorHandle}>error</Button>
          <Button onTap={this.infoHandle}>info</Button>
          <Button onTap={this.loadingHandle}>loading,自动关闭</Button>
          <Button onTap={this.loadingHandle1}>loading,主动关闭</Button>
		</div>
	)
  }
}
```






### API

#### Toast.success(content, duration, onClose)

#### Toast.error(content, duration, onClose)

#### Toast.info(content, duration, onClose)

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| content    |   string or jsx |  提示内容 |-|
| duration    | number |  延迟关闭时间|3|
| onClose    |   function |  提示关闭时调用函数|-|


#### Toast.loading(content, duration, onClose)
loading时duration默认为null，需手动关闭

#### Toast.hide()
销毁



  





 




