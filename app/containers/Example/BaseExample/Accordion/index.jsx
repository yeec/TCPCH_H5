import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Accordion from '../../../../../app/components/Base/accordion/index.web.jsx';
import Cell from '../../../../../app/components/Base/cell/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    onChange = (key) => {
        console.log(key)
    };

    render() {
        return (
            <div>
                <Accordion defaultActiveKey="1" onChange={this.onChange} >
                    <Accordion.Panel header="标题1" key="1">
                        <Cell title="列表1"/>
                        <Cell title="列表2"/>
                        <Cell title="列表3"/>
                    </Accordion.Panel>
                    <Accordion.Panel header="标题2" key="2">
                        <Cell title="列表1"/>
                        <Cell title="列表2"/>
                        <Cell title="列表3"/>
                    </Accordion.Panel>
                    <Accordion.Panel header="标题3" key="3">
                        <Cell title="列表1"/>
                        <Cell title="列表2"/>
                        <Cell title="列表3"/>
                    </Accordion.Panel>
                </Accordion>
            </div>
        )
    }
}

