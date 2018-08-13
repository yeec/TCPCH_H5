import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//import DatetimePicker from '../../../app/components/Base/datetime-picker/index.web.jsx';
import Picker from '../../../../../app/components/Base/picker/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';
import district from '../../../../../mock/FetchDemo/district';
import Button from '../../../../../app/components/Base/button/index.web.jsx';

const formatDate = (date)=> {
    return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8)
}
@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            pickerVisible: false,
            checked:true,
            modalVisible: false,
            modalVisible1: false,
            modalVisible2: false,
          time: new Date(),
            isOpen: false,
        };
    }

    onPickerChange = (value) =>{
        console.log(value);
    };

    onPickerValueChange = (value) =>{
        console.log(value);
        this.setState({
            pickerValue: value,
            pickerVisible: false,
        })
    };


    showPicker = () =>{
        this.setState({
            pickerVisible: true,
        })
    };

    render() {
        return (
            <div>
                <p>列表内使用</p>
                <Picker cellTitle="旅游地区" data={district}
                        placeholder="请选择"  title="选择地区"
                        onPickerChange={this.onPickerChange}
                        onChange={this.onPickerValueChange} value={this.state.pickerValue}/>

                <p>点击触发</p>
                <div>
                    <Picker data={district} title="选择地区"
                            onPickerChange={this.onPickerChange} visible={this.state.pickerVisible}
                            onChange={this.onPickerValueChange} value={this.state.pickerValue}
                             showCell={false}/>
                        <Button onTap={this.showPicker}>打开Picker</Button>
                    </div>
            </div>
        )
    }
}

