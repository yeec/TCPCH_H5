/**
 *
 * Description:
 * Scroller Depends on zscroller (Also be used for pull refresh)
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Cascader from '../cascader/cascader.web';
import PopupCascader from '../cascader/popup';
import arrayTreeFilter from '../../../util/common/array-tree-filter';
import Tappable from 'react-tappable';

import './style/index.web';
import '../picker/style/index.web';


const prefixCls = 'ryt-picker';
const pickerPrefixCls = 'ryt-picker-col';
const popupPrefixCls = 'ryt-picker-popup';

const defaultFormat = (values) => {
  return values.join(',');
};


export default class Picker extends React.Component {

  constructor(props) {
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

  render() {
    const { props } = this;
    const { value, okText, dismissText, title, placeholder, labelNumber } = props;

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
    const cname = "";
    const defaultInputCls = 'ryt-input';
    const labelCls = classNames({
      'ryt-input-label': true,
      [`${defaultInputCls}-label-2`]: labelNumber === 2,
      [`${defaultInputCls}-label-3`]: labelNumber === 3,
      [`${defaultInputCls}-label-4`]: labelNumber === 4,
      [`${defaultInputCls}-label-5`]: labelNumber === 5,
      [`${defaultInputCls}-label-6`]: labelNumber === 6,
      [`${defaultInputCls}-label-7`]: labelNumber === 7
    });

    // 选择/录入框的外层盒子样式
    const boxStyle = {
      'display': 'flex',
      'alignItems': 'center',
      'width': '100%'
    };

    const cls = classNames({
      'ryt-input-list-item': true,
      'ryt-input-item': true
    });

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
        <div className={cls}>
          < Tappable style={boxStyle} component="label">
            <div className={labelCls}>{title}</div>
            <div className='ryt-input-control'>
              <div>{des}
              </div>
            </div>
            <div className="ryt-input-extra">
              <div className="ryt-icon ryt-icon-xs ryt-icon-arrow-right"></div>
            </div>
          </Tappable>
        </div>
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
    labelNumber: PropTypes.oneOf([2, 3, 4, 5, 6, 7])
  };

  static defaultProps = {
    format: defaultFormat,
    style: { left: 0, bottom: 0 },
    cols: 3,
    value: [],
    placeholder: '请选择',
    okText: '确定',
    dismissText: '取消',
    title: '',
    labelNumber: 4
  };
}