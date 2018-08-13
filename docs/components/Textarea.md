#  Textarea 多行文本输入
----------

### 组件名
Textarea

### 组件描述
多行文本输入框

### 组件用途
提供一个多行文本输入框

### 代码示例

### API

| props      |     类型 |   说明   | 默认值| 
| :-------- | :--------| :------ |:------|
|rows| number | textarea文本行数 | 3|
|name|  string | textarea对应表单参数名称 | - |
|defaultValue| string | 文本框默认值| - | 
|value| string | 文本框内容值| - | 
|count| number | textarea最大长度限制| - | 
|editable| bool | 是否允许修改 | true | 
|disabled| bool | 是否禁止文本框 | false |
|placeholder| string | 占位文本，在没有内容时显示 | - |
|clear| bool | 是否开启清除文本的按钮和功能 | false |
|onChange| function | 内容变化时回调函数 | - | 
|onBlur| function | input失去焦点回调 | - | 
|onFocus| function | input获取焦点回调 | - |
|error|  bool  | 启用报错样式 | false |
|onErrorClick|  function | 点击报错icon触发的回调 | - |
|labelNumber|  number(可选2, 3, 4, 5, 6, 7) | 标题字数，用于input对齐 | 4 |






