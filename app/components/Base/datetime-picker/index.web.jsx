import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Cell from '../cell/cell.web';
import {formatFn} from './utils';
import PopupRMCDatePicker from '../datatimepicker/Popup/Popup';
import RMCDatePicker from '../datatimepicker/Picker/DatePicker';
import PureRenderHoc from '../../../util/hoc/index';
import zhCN from './locale/zh_CN';
import './style/index.web';
const prefixCls =  'apollo-picker';
const pickerPrefixCls = 'apollo-picker-col';
const popupPrefixCls = 'apollo-picker-popup';



const DatetimePicker = (props) => {
  const { value, defaultDate, cellTitle, okText, dismissText } = props;
  const des = value ? formatFn(props, value) : '';

  const dataPicker = (
    <RMCDatePicker
      locale={props.locale || zhCN}
      minDate={props.minDate}
      maxDate={props.maxDate}
      mode={props.mode}
      pickerPrefixCls={pickerPrefixCls}
      prefixCls={prefixCls}
      defaultDate={value || defaultDate}
    />
  );
  return (
    <PopupRMCDatePicker
      datePicker={dataPicker}
      WrapComponent="div"
      transitionName="am-slide-up"
      maskTransitionName="am-fade"
      {...props}
      prefixCls={popupPrefixCls}
      date={value || defaultDate}
      dismissText={<span className={`${popupPrefixCls}-header-cancel-button`}>{dismissText}</span>}
      okText={<span className={`${popupPrefixCls}-header-ok-button`}>{okText}</span>}
    >
      <Cell title={cellTitle} description={des} arrow/>
    </PopupRMCDatePicker>
  );
};

//生产版本可以注释掉,用于优化大小
DatetimePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'datetime','time']),
  format: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func,
  ]),
};

DatetimePicker.defaultProps = {
  mode: 'date',
  defaultDate: moment(),
  placeholder: '请选择',
  okText: '确定',
  dismissText: '取消',
  title: '',
  cellTitle: ''
};

export default PureRenderHoc(DatetimePicker);



