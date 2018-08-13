import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Checkbox from '../../../../../app/components/Base/checkbox/index.web.js';
import Cell from '../../../../../app/components/Base/cell/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

            checked:true,

        };
    }

    changeHandle = (checked) => {
        console.log(checked);
        this.setState({checked});
    };

    render() {
        return (
            <div>
                <Cell.Group header="选择框标题">
                    <Checkbox.CheckboxList title="选项1 禁用" checkboxProps={{disabled: true}}/>
                    <Checkbox.CheckboxList title="选项2 禁用" checkboxProps={{disabled: true,value:true}}/>
                    <Checkbox.CheckboxList title="选项3" onTap={(checked)=>{console.log(checked)}}/>
                    <Checkbox.CheckboxList title="选项4" checkboxProps={{defaultValue:true}}/>
                </Cell.Group>
                <p>协议</p>
                <div>
                    <Checkbox.Agree >
                        同意
                    </Checkbox.Agree >
                    <Checkbox.Agree value={this.state.checked} onChange={this.changeHandle}>
                        是否同意<a href="#">《信用支付服务合同信用支付服务合同信用支付服务合同》</a>
                    </Checkbox.Agree>
                </div>
                <p>基础</p>
                <div>
                    禁用状态
                    <br/><Checkbox value={true} onChange={this.changeHandle} disabled/>
                    <br/>
                    默认状态
                    <br/><Checkbox onChange={this.changeHandle}/>
                </div>
            </div>
        )
    }
}

