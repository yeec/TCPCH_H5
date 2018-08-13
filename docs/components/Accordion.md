#  Accordion 手风琴
----------

### 组件名
Accordion 

### 组件描述
手风琴菜单，可以折叠/展开的内容区域

### 组件用途
用于复杂区域的分组及隐藏。通常状况下只允许一个区域展开，也可设置多区域同时展开。

### 代码示例

#### 默认
```javascript
import {Accordion,Cell} from 'apollo-mobile';

export default class AccordionDemo extends PureComponent {
  onChange = (key) => {
    console.log(key)
  };

  render() {
	return (
		<Accordion onChange={this.onChange}>
          <Accordion.Panel header="第一部分" key="1">
              <Cell title="列表1" />
              <Cell title="列表2"/>
              <Cell title="列表3"/>
          </Accordion.Panel>
         <Accordion.Panel header="第二部分" key="2">
            <Cell title="列表1" />
            <Cell title="列表2"/>
            <Cell title="列表3"/>
          </Accordion.Panel>
	    </Accordion>
	)
  }
}
```


#### 手风琴模式
```javascript
render() {
	return (
		<Accordion defaultActiveKey="1" autoClose={false}>
          <Accordion.Panel header="第一部分" key="1" >
            <Cell title="列表1" />
            <Cell title="列表2"/>
            <Cell title="列表3"/>
          </Accordion.Panel>
          <Accordion.Panel header="第二部分" key="2">
            <Cell title="列表1" />
            <Cell title="列表2"/>
            <Cell title="列表3"/>
          </Accordion.Panel>
	    </Accordion>
	)
 }
```


### API

#### Accordion

| props      |     类型 |说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| autoClose    |   boolean |  是否自动折叠  | true|
|activeKey| string | 当前展开面板的key | - |
|defaultActiveKey| string | 初始化展开面板的key| - | 
|onChange| func | 展开面板的回调函数，入参为展开面板的key值, autoClose为false的时候为key的数组|  | 

#### Accordion.Panel

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| key    |   string |  唯一key  |-|
|header| string or jsx | 面板头标题 | - |


