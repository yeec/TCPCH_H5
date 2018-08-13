import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Cell from '../../../../../app/components/Base/cell/index.web.js';
import Radio from '../../../../../app/components/Base/radio/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    changeHandle = (checked) => {
        console.log(checked);
    };

    render() {
        return (
            <div >
                <p>基本</p>
                <div>
                    禁用状态
                    <Radio defaultValue={true} onChange={this.changeHandle} disabled/>
                    默认状态
                    <Radio onChange={this.changeHandle} name="radio1"/>
                    <Radio onChange={this.changeHandle} name="radio1"/>
                </div>
                <p>Radio组</p>
                <Radio.Group onChange={(key) => {console.log(key)}} defaultActiveKey="0">
                    <Radio key="0"/>
                    <Radio key="1"/>
                </Radio.Group>
                <p>Radio列表</p>
                <Cell.Group>Radio
                    <Radio.RadioList title="选项1 禁用" radioProps={{disabled: true}} onTap={(arg) => {console.log(arg)}}/>
                    <Radio.RadioList title="选项2 禁用" radioProps={{disabled: true,value:true}}/>
                    <Radio.RadioList title="选项3" onTap={(arg) => {console.log(arg)}} radioProps={{name:'1'}}/>
                    <Radio.RadioList title="选项3" radioProps={{defaultValue:true,name:'2'}} onTap={(arg) => {console.log(arg)}}/>
                </Cell.Group>


            </div>
        )
    }
}

