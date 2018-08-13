import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';
import Input from '../../../../../app/components/Base/input/index.web.jsx';
import DatetimePicker from '../../../../../app/components/Base/datatimepicker/Picker/DatePicker.jsx';
//import DatetimePicker from '../../../../../app/components/Base/datetime-picker/index.web.jsx';
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

          time: new Date(),
            isOpen: false,
        };
    }


    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (res) => {
        this.setState({ time:moment(res).format('YYYY-MM-DD'), isOpen: false });
    }

    render() {
        return (
            <div >

                <div className="App">
                    <Input  value={moment(this.state.time).format('YYYY-MM-DD')}
                            extra="开始时间"
                            onExtraClick={this.handleClick}>时间</Input>

                    <DatePicker
                        theme="ios" showFormat="YYYY/MM/DD"
                        dateFormat={[ 'YYYY','MM', 'DD']}
                        value={this.state.time}
                        isOpen={this.state.isOpen}
                        onSelect={this.handleSelect}
                        onCancel={this.handleCancel} />
                </div>
                {/*<DatetimePicker></DatetimePicker>*/}

            </div>
        )
    }
}

