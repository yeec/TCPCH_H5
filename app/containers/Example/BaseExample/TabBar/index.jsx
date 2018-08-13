import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TabBar from '../../../../../app/components/Base/tab-bar/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';


const formatDate = (date)=> {
    return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8)
}
@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <p>TabBar 标签栏</p>
                <TabBar defaultActiveKey="1">
                    <TabBar.Panel icon="success" text="tab1" key="1">tab1内容</TabBar.Panel>
                    <TabBar.Panel icon="success" text="tab1" key="2">tab2内容</TabBar.Panel>
                    <TabBar.Panel icon="success" text="tab1" key="3" disabled>tab3内容</TabBar.Panel>
                    <TabBar.Panel icon="success" text="tab1" key="6" hasBadge>tab2内容</TabBar.Panel>
                    <TabBar.Panel icon="success" text="tab1" key="7" hasBadge badgeType="text" badgeText="NEW">tab3内容</TabBar.Panel>
                    <TabBar.Panel icon="success" text="tab1" key="8" hasBadge badgeType="text" badgeText={100}>tab4内容</TabBar.Panel>
                </TabBar>

            </div>
        )
    }
}

