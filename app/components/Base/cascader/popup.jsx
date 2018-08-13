/**
 * Created by lichuan on 16/10/12.
 */
import React , {PropTypes} from 'react';
import classNames from 'classnames';
import PopupPicker from 'rmc-picker/lib/Popup';
import Cascader from './cascader.web';
import noop from '../../../util/common/noop';



let defaultPrefixCls = 'apollo-cascader-popup';

export default class PopupCascader extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      pickerValue: null,
      visible: this.props.visible || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setVisibleState(nextProps.visible);
    }
  }

  onPickerChange = (pickerValue) => {
    this.setState({
      pickerValue,
    });
    if (this.props.cascader.props.onChange) {
      this.props.cascader.props.onChange(pickerValue);
    }
  };

  onOk = () => {
    this.props.onChange(this.cascader.getValue().filter(c => c !== null && c !== undefined));
  };

  saveRef = (cascader) => {
    this.cascader = cascader;
  };

  setVisibleState(visible) {
    this.setState({
      visible,
    });
    if (!visible) {
      this.setState({
        pickerValue: null,
      });
    }
  }

  fireVisibleChange = (visible) => {
    if (this.state.visible !== visible) {
      if (!('visible' in this.props)) {
        this.setVisibleState(visible);
      }
      this.props.onVisibleChange(visible);
    }
  }

  render() {

    const prefixCls = this.props.prefixCls || defaultPrefixCls;

    const cascader = React.cloneElement(this.props.cascader, {
      value: this.state.pickerValue || this.props.value,
      onChange: this.onPickerChange,
      ref: this.saveRef,
      data: this.props.cascader.props.data,
    });

    return (<PopupPicker
      {...this.props}
      prefixCls={prefixCls}
      onVisibleChange={this.fireVisibleChange}
      onOk={this.onOk}
      content={cascader}
      visible={this.state.visible}
    />);
  }

  //生产版本可以注释掉,用于优化大小
  static propTypes = {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.array,
    //cascader: PropTypes.instanceOf(Cascader),
    onChange: PropTypes.func,
    onDismiss: React.PropTypes.func,
    //okText: PropTypes.string,
    //dismissText: PropTypes.string,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'apollo-cascader-popup',
    onVisibleChange: noop,
    onChange: noop,
  };



}
