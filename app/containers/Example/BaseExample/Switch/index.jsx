import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Cell from '../../../../../app/components/Base/cell/index.web.js';
import Switch from '../../../../../app/components/Base/switch/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.state = {
            switch1Checked: false
        };
    }

    changeHandle = (checked) => {
        this.setState({
            switch1Checked:checked
        })
    };

    render() {
        return (
            <div >
                <p>Switch 开关 示例</p>
                <Switch value={this.state.switch1Checked} onChange={this.changeHandle}/>

                <Cell.Group header="这是个列表switch">
                    <Switch.SwitchList title="禁用关" switchProps={{disabled: true}}/>
                    <Switch.SwitchList title="禁用开" switchProps={{disabled: true, value: true}}/>
                    <Switch.SwitchList title="开关" switchProps={{defaultValue: true}}/>
                    <Switch.SwitchList title="开关" switchProps={{
                        defaultValue: true, onChange: (arg)=> {
                            console.log(arg)
                        }
                    }}/>
                </Cell.Group>

            </div>
        )
    }
}

