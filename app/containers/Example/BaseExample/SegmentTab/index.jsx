import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SegmentTab from '../../../../../app/components/Base/segment-tab/index.web.jsx';
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
                <div><p>示例</p>
                    <SegmentTab>
                        <SegmentTab.Panel tab="第一项" key="1">第一项内容</SegmentTab.Panel>
                        <SegmentTab.Panel tab="第二项" key="2" disabled>第二项内容</SegmentTab.Panel>
                        <SegmentTab.Panel tab="第三项" key="3">第三项内容</SegmentTab.Panel>
                        <SegmentTab.Panel tab="第三项" key="4">第四项内容</SegmentTab.Panel>
                    </SegmentTab>
                </div>


            </div>
        )
    }
}

