#  DatetimePicker 时间选择器
----------

### 组件名
DatetimePicker

### 组件描述
时间日期选择器，支持多语言

### 组件用途
提供时间和日期的预设值让用户选择，避免输入

### 代码示例

### API


| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
| mode    |   string(date、time、datetime) | 模式设置，日期date、时间time、日期+时间datetime  | date |
|locale|  object | 多语言支持，属性为{ year: '年', month: '月', day: '日', hour: '时', minute: '分'} | 中文的预设值 |
|value| moment | 选中的时间值| - | 
|defaultDate| moment | 默认选中的时间值| - | 
|minDate| moment | 时间下限| - | 
|maxDate| moment | 时间上限| - | 
|okText| string | 弹出选择器, 确定的文本显示 | 确定 |
|dismissText| string | 弹出选择器, 取消的文本显示 | 取消 |
|title| string | 弹出选择器, 标题文本 | - |
|cellTitle| string | cell显示时, 标题文本 | - |
|onChange|  function | 弹出选择器, 确定选择回调, 传入参数选中value | - |





