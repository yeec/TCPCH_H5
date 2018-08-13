import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Cell from '../../../../../app/components/Base/cell/index.web.js';
import InputItem from '../../../../../app/components/Base/input-item/index.web.jsx';
import AuthInput from '../../../../../app/components/Base/auth-input/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    onErrorClick(){
        alert("请输入正确格式");
    }

    render() {
        return (
            <div>
                <Cell.Group header="输入列表">
                    <InputItem placeholder="无标题"></InputItem>
                    <InputItem placeholder="图标标题" labelNumber={5}>
                        <img src="https://zos.alipayobjects.com/rmsportal/HssPJKvrjEByyVWJIFwl.png" alt="icon" />
                    </InputItem>
                    <InputItem placeholder="请输入银行卡号" labelNumber={5} type="number">标题</InputItem>
                </Cell.Group>
                <InputItem placeholder="内容文字居右" labelNumber={5} type="phone" textAlign="right">标题</InputItem>
                <InputItem placeholder="***" labelNumber={5} type="password">密码</InputItem>
                <InputItem placeholder="标题长度默认的5个汉字" labelNumber={5}>标题</InputItem>
                <InputItem placeholder="0.00" labelNumber={5} rightText="元">价格</InputItem>
                <InputItem placeholder="右侧搜索图标" labelNumber={5} rightExtra="true" ExtraSearchIcon="true">标题</InputItem>
                <InputItem placeholder="右侧下拉图标" labelNumber={5} rightExtra="true" ExtraArrowIcon="true" >日期选择</InputItem>
                <InputItem placeholder="清除内容" labelNumber={5} rightExtra="true" ExtraClearIcon="true">清除内容</InputItem>
                <AuthInput />
                <Cell.Group header="录入验证">
                    <InputItem placeholder="请输入手机号码" defaultValue="123456" labelNumber={5} rightExtra="true" type="phone" onErrorClick={this.onErrorClick.bind(this)}>手机号码</InputItem>
                </Cell.Group>
            </div>
        )
    }
}
