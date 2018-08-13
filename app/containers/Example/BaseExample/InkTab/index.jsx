import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import InkTab from '../../../../../app/components/Base/ink-tab/index.web.js';
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
                <p>默认</p>
                <InkTab onChange={(key)=>{console.log(key)}} >
                    <InkTab.Panel tab="第一项" key="1">第一项内容</InkTab.Panel>
                    <InkTab.Panel tab="第二项" key="2">第二项内容</InkTab.Panel>
                    <InkTab.Panel tab="第三项" key="3">第三项内容</InkTab.Panel>
                </InkTab>
                <p>标签在底部</p>
                <InkTab  position="bottom">
                    <InkTab.Panel tab="第一项" key="4">第一项内容</InkTab.Panel>
                    <InkTab.Panel tab="第二项" key="5">第二项内容</InkTab.Panel>
                    <InkTab.Panel tab="第三项" key="6">第三项内容</InkTab.Panel>
                </InkTab>
                <p>某项不可用</p>
                <InkTab  defaultActiveKey="9">
                    <InkTab.Panel tab="第一项" key="7">第一项内容</InkTab.Panel>
                    <InkTab.Panel tab="第二项" key="8" disabled>第二项内容</InkTab.Panel>
                    <InkTab.Panel tab="第三项" key="9">第三项内容</InkTab.Panel>
                </InkTab>

            </div>
        )
    }
}

