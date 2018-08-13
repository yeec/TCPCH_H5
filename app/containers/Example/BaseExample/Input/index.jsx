import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Cell from '../../../../../app/components/Base/cell/index.web.js';
import moment from 'moment';
import Input from '../../../../../app/components/Base/input/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

// | props      |     类型 |   说明   | 默认值|
// | :-------- | :--------| :------ |:------|
// | type    |   string（取值包括 text,bankCard,phone,number,password） | 输入文本类型 | 默认text|
// |name|  string | Input对应表单参数名称 | - |
// |defaultValue| string | 文本框默认值| - |
// |value| string | 文本框内容值| - |
// |maxLength| number | input最大长度限制| - |
// |editable| bool | 是否允许修改 | true |
// |disabled| bool | 是否禁止文本框 | false |
// |placeholder| string | 占位文本，在没有内容时显示 | - |
// |clear| bool | 是否开启清除文本的按钮和功能 | false |
// |onChange| function | 内容变化时回调函数 | - |
// |onBlur| function | input失去焦点回调 | - |
// |onFocus| function | input获取焦点回调 | - |
// |extra| string or node | 右边注释 | - |
// |onExtraClick|  function | 点击extra部分回调 | - |
// |error|  bool  | 启用报错样式 | false |
// |onErrorClick|  function | 点击报错icon触发的回调 | - |
// |labelNumber|  number(可选2, 3, 4, 5, 6, 7) | 标题字数，用于input对齐 | 4 |
    render() {
        return (
            <div >
                <p>input输入框</p>
                <Input  type="text" clear={true} labelNumber={6}  maxLength="10" placeholder="请输入姓名">请输入姓名</Input>
                <Input  type="bankCard"  textAlign="right" labelNumber={6}  maxLength="19" placeholder="请输入卡号">请输入卡号</Input>
                <Input  type="phone"  textAlign="right" labelNumber={6}  maxLength="19" placeholder="请输入手机号">请输入手机号</Input>
                <Input  type="number"  textAlign="right" labelNumber={6}  maxLength="19" placeholder="请输入数字">请输入数字</Input>
                <Input  type="password"  textAlign="right" labelNumber={6}  maxLength="19" extra="请输入密码">请输入密码</Input>
                <Input  type="password" disabled textAlign="right" labelNumber={6}  maxLength="19" >disabled</Input>
                <Input  type="text"  textAlign="right" labelNumber={6}  maxLength="19" value="1212" editable >editable不可修改</Input>
                {/*<Input.NativeAmount textAlign="right" type="number" isAmount/>*/}
                {/*<Input.NativeNum textAlign="right" type="number" isAmount />*/}

            </div>
        )
    }
}

