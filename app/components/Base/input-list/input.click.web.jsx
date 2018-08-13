/**
 *
 * Description:
 * Scroller Depends on zscroller (Also be used for pull refresh)
 */
import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import arrayTreeFilter from "../../../util/common/array-tree-filter";
import Common from "../../../util/common.jsx";
import Tappable from "react-tappable";
import Dialog from "rc-dialog";
import Modal from "../../mbank/mbank-public-select-click/mbank-public-select-modal/index.web.js";

import "./style/index.web";
import "../picker/style/index.web";

const defaultFormat = values => {
  return values.join(",");
};

export default class InputClick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.placeholder,
      typeValue: this.props.value
    };
  }

  //下挂账户列表显示modal框
  showListClickBox = () => {
    let that = this;
    this.setState({
      pickerVisible: true
    });
    let allaccount = that.props.items.map(function(item, i) {
      // console.log(item)
      // console.log(that.props.customerName)
      item.cusName = that.props.customerName;
      
      return JSON.stringify(item);
    });
    Modal.selectListClick(
      {
        items: that.props.items,
        close: Common.closeModal,
        closeText: "关闭"
      },
      function(key) {
        let typeListItem = that.props.items.map(function(item, i) {
          item.now = "0";
          if (i === key) {
            item.now = "1";
            that.setState({
              // typeList: item,
              type: item.label,
              typeValue: item.value
            });
            that.FatherMethodFn(item.label, item.value)
            // return item;
            // console.log(item.label);
            // console.log(item.value);
          }
          // return item;
        });
        Common.closeModal();
      }
    );
  };
  // 向父组件传递值并调用方法
  FatherMethodFn(label, val) {
    //transactionId为交易类型,item为账户信息
    this.props.onChange(label, val);
  }
  render() {
    const { props } = this;
    const {
      value,
      okText,
      dismissText,
      title,
      placeholder,
      labelNumber,
      items,
      cancelIndex,
      closeText,
      onChange,
    } = props;

    // const type = this.getSel() || placeholder;
    const cname = "";
    const defaultInputCls = "ryt-input";
    const labelCls = classNames({
      "ryt-input-label": true,
      [`${defaultInputCls}-label-2`]: labelNumber === 2,
      [`${defaultInputCls}-label-3`]: labelNumber === 3,
      [`${defaultInputCls}-label-4`]: labelNumber === 4,
      [`${defaultInputCls}-label-5`]: labelNumber === 5,
      [`${defaultInputCls}-label-6`]: labelNumber === 6,
      [`${defaultInputCls}-label-7`]: labelNumber === 7
    });

    // 选择/录入框的外层盒子样式
    const boxStyle = {
      display: "flex",
      alignItems: "center",
      width: "100%"
    };

    const cls = classNames({
      "ryt-input-list-item": true,
      "ryt-input-item": true
    });

    return (
      <div className={cls}>
        <Tappable
          style={boxStyle}
          component="label"
          onClick={this.showListClickBox.bind()}
        >
          <div className={labelCls}>{title}</div>
          <div className="ryt-input-control">
            <div>{this.state.type}</div>
          </div>
          <div className="ryt-input-extra">
            <div className="ryt-icon ryt-icon-xs ryt-icon-arrow-right" />
          </div>
        </Tappable>
      </div>
    );
  }

  //生产版本可以注释掉,用于优化大小
  static propTypes = {
    // value: PropTypes.array,
    callTest: PropTypes.func,
    onVisibleChange: PropTypes.func,
    visible: PropTypes.bool,
    labelNumber: PropTypes.oneOf([2, 3, 4, 5, 6, 7])
  };

  static defaultProps = {
    format: defaultFormat,
    cols: 3,
    value: [],
    labelNumber: 4
  };
}
