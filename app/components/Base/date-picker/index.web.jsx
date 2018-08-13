import React, { PropTypes } from 'react';
import PopPicker from 'rmc-date-picker/lib/Popup';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import { cn, dateFormat, timeFormat, datetimeFormat, now } from './utils';
import './style/index.web';

class DatePickerDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: null,
		};
	}

	//每次接受新的props触发
	componentWillReceiveProps(nextProps) {
		if (nextProps.content !== this.props.content) {
			this.setState({
				date:null
			})
		}
	}
	
	onChange = (date) => {
		this.setState({
			date: date
		});
		this.props.returnType == 'value' ?
			this.props.onChange(dateFormat(date, this.props.mode).value)
			:
			this.props.onChange(dateFormat(date, this.props.mode).formatValue)
	}

	render() {
		const props = this.props;
		const { date } = this.state;
		const datePicker = (
			<DatePicker
				// rootNativeProps={{'data-xx': 'yy'}}
				minDate={props.minDate}
				maxDate={props.maxDate}
				defaultDate={now}
				mode={props.mode}
			// use12Hours={true}
			// locale={props.locale}
			/>
		);
		return (
			<PopPicker
				datePicker={datePicker}
				transitionName="rmc-picker-popup-slide-fade"
				maskTransitionName="rmc-picker-popup-fade"
				title={props.title}
				date={date}
				onChange={this.onChange}
				okText={props.okText}
				dismissText={props.dismissText}
				onDismiss={props.onDismiss}
			>
				<span>{date && dateFormat(date, props.mode).formatValue || props.content}</span>
			</PopPicker>
		);
	}
}

DatePickerDemo.propTypes = {
	// mode: React.propTypes.oneOf(['datetime', 'date', 'time', 'year', 'month']),
	// onDismiss: React.propTypes.func,
	// okText: React.propTypes.string,
	// dismissText: React.propTypes.string,
	// title: React.propTypes.string,
}
DatePickerDemo.defaultProps = {
	// locale: cn ? zhCn : enUs,
	mode: 'date',
	okText: "确认",
	dismissText: '取消',
	title: '选择日期',
	// minDate: new Date(2015, 8, 13),
	// maxDate: new Date(2018, 8, 15),
	onChange: () => { },//点击确定按钮
	onDismiss: () => { },//点击取消按钮，
	content: '选择日期',
	returnType: 'formatValue'  //value or formatValue
};

export default DatePickerDemo;
