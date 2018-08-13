/**
 *
 * Description:
 * Scroller Depends on zscroller (Also be used for pull refresh)
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Cell from '../cell/cell.web';
import Cascader from '../cascader/cascader.web';
import PopupCascader from '../cascader/popup';
import arrayTreeFilter from '../../../util/common/array-tree-filter';

import './style/index.web';


const prefixCls =  'ryt-picker';
const pickerPrefixCls = 'ryt-picker-col';
const popupPrefixCls = 'ryt-picker-popup';

const defaultFormat = (values) => {
  return values.join(',');
};


export default class Picker extends React.Component {

  constructor(props){
    super(props);
  }

  getSel = () => {
    const value = this.props.value || [];
    const treeChildren = arrayTreeFilter(this.props.data, (c, level) => {
      return c.value === value[level];
    });
    return this.props.format(treeChildren.map((v) => {
      return v.label;
    }));
  };

  render(){
    const {props} = this;
    const {value, okText, dismissText, cellTitle, placeholder, showCell, arrow} = props;


    const cascader = (
      <Cascader
        prefixCls={prefixCls}
        pickerPrefixCls={pickerPrefixCls}
        data={props.data}
        cols={props.cols}
        onChange={props.onPickerChange}
      />
    );

    const des = this.getSel() || placeholder;

    return (
      <PopupCascader
        cascader={cascader}
        WrapComponent="div"
        transitionName="ryt-am-slide-up"
        maskTransitionName="ryt-am-fade"
        {...props}
        prefixCls={popupPrefixCls}
        value={value}
        dismissText={<span className={`${popupPrefixCls}-header-cancel-button`}>{dismissText}</span>}
        okText={<span className={`${popupPrefixCls}-header-ok-button`}>{okText}</span>}
      >
        {
          showCell? <Cell title={cellTitle} description={des} arrow={arrow}/> : null
        }
      </PopupCascader>
    );
  }

  //生产版本可以注释掉,用于优化大小
  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.array,
    format: PropTypes.func,
    onVisibleChange: PropTypes.func,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    format: defaultFormat,
    style: {left: 0, bottom: 0},
    cols: 3,
    value: [],
    placeholder: '请选择',
    okText: '确定',
    dismissText: '取消',
    title: '',
    cellTitle: '',
    showCell: true,
    arrow: 'down'
  };
}
