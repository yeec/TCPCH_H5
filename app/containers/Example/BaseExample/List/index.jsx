import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import List from '../../../../../app/components/Base/list/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }


    render() {
        return (
            <div >

                <List.Group header="这是个列表List">
                    <List title="日期时间"  />
                    <List title="交易明细"  arrow/>
                    <List title="开卡机构"  description="徽商银行合肥寿春路支行"/>
                    <List title="账户类别"  description="I类账户" icon="svg-search"  />
                    <List title="这是标题" thumb="svg-search" description="点击弹框" onTap={()=>{alert('tap!')}} arrow/>
                    <List title="这是标题"  disabled description="disabled"  arrow/>
                    <List title="这是标题"  description="disabled" link="设置" />
                    <List title="这是标题"  link="设置" />
                    <List title="这是标题"  description="disabled"  arrow/>
                    <List title="这是标题" thumb="svg-search" active description="点击弹框" onTap={()=>{alert('tap!')}} arrow/>

                </List.Group>
                <List.Group header="这是个列表List">
                <List title="账户类别"  subTitle="subTitle" thumb="svg-search"  arrow  description="description"  />
                <List title="账户类别"  subTitle="subTitle" description="description" onTap={()=>{alert('tap!')}} subDescription="subDescription" thumb="svg-search"  arrow    />
                </List.Group>
            </div>
        )
    }
}

