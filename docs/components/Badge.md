#  Badge 徽标
----------

### 组件名
Badge 

### 组件描述
图表右上角小红点，数字或文字

### 组件用途
提醒用户有更新或者提示用户

### 代码示例

#### 小红点
```javascript
import {Badge,Cell} from 'apollo-mobile';

export default class BadgeDemo extends PureComponent {
  render() {
	return (
		<Badge>
	       <div style={{width:60,height:60,backgroundColor:'#ccc'}}>
	       </div>
	    </Badge>
	)
  }
}
```


#### 数字
```javascript
render() {
	return (
		<div style={{padding:'0 10px'}}>
          <Badge type="text" text={10}>
            <div style={{width:60,height:60,backgroundColor:'#ccc'}}>
            </div>
          </Badge>
          <div style={{marginBottom:15}}></div>
          <Badge type="text" text={20} maxNum={15}>
            <div style={{width:60,height:60,backgroundColor:'#ccc'}}>
            </div>
          </Badge>
        </div>
	)
}
```

#### 文字
```javascript
render() {
	return (
		<div style={{padding:'0 10px'}}>
          <Badge type="text" text='NEW'>
            <div style={{width:60,height:60,backgroundColor:'#ccc'}}>
            </div>
          </Badge>
          <div style={{marginBottom:15}}></div>
          <Badge type="text" text='small' small>
            <div style={{width:60,height:60,backgroundColor:'#ccc'}}>
            </div>
          </Badge>
        </div>
	)
 }
```

#### 列表  

```javascript
render() {
	return (
		<Cell.Group header="列表式Badge">
          <Cell title={<span>列表1 <Badge/></span>}/>
          <Cell title={<span>列表2 <Badge type="text" text="NEW" /></span>}/>
          <Cell title='列表3' description={<Badge type="text" text={100} />} arrow/>
        </Cell.Group>
	)
}
```


### API

#### Badge

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| type    |   string |  徽标类型（dot or text）  | dot|
|text| string or number | 徽标展示文字 | - |
|small| boolean | 小号徽标| false | 
|maxNum| number | 如果是数字的最大值 | 99 | 
|show| boolean | 是否显示 | true | 




