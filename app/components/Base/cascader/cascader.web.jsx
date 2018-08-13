import React from 'react';
import classNames from 'classnames';
import Picker from 'rmc-picker/lib/Picker';
import { cascaderProps,  cascaderDefaultProps} from './cascaderTypes';
import arrayTreeFilter from '../../../util/common/array-tree-filter';


//在此修改样式前缀
let defaultPrefixCls = 'apollo-cascader';
let defaultPickerPrefixCls = 'rmc-picker';


export default class Cascader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.getValue(this.props.data, this.props.defaultValue || this.props.value),
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: this.getValue(nextProps.data, nextProps.value),
      });
    }
  }

  getValue(d, val) {
    let data = d || this.props.data;
    let value = val || this.props.value || this.props.defaultValue;
    if (!value || !value.length) {
      value = [];
      //初始化Value赋值
      for (let i = 0; i < this.props.cols; i++) {
        if (data && data.length) {
          value[i] = data[0].value;
          data = data[0].children;
        } else {
          value[i] = undefined;
        }
      }
    }
    return value;
  }

  getColArray() {
    const ret = [];
    for (let i = 0; i < this.props.cols; i++) {
      ret[i] = undefined;
    }
    return ret;
  }

  getChildrenTree() {
    const {data, cols} = this.props;
    const value = this.state.value;
    //扁平化拆分树结构
    const childrenTree = arrayTreeFilter(data, (c, level) => {
      return c.value === value[level];
    }).map(c => c.children);
    childrenTree.length = cols - 1;
    childrenTree.unshift(data);
    return childrenTree;
  }

  onValueChange(index, selectNameValue) {
    
    const value = this.state.value.concat();
    value[index] = selectNameValue;
    const children = arrayTreeFilter(this.props.data, (c, level) => {
      return level <= index && c.value === value[level];
    });
    let data = children[index];
    let i;
    for (i = index + 1; data && data.children && data.children.length && i < this.props.cols; i++) {
      data = data.children[0];
      value[i] = data.value;
    }
    value.length = i;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
  }

  render() {
    const props = this.props;
    const {
        className, disabled, pickerItemStyle,
      } = props;

    //style
    const prefixCls = props.prefixCls || defaultPrefixCls;
    const pickerPrefixCls = props.pickerPrefixCls || defaultPickerPrefixCls;
    const cascaderCls = classNames(className, prefixCls);

    const value = this.state.value;
    const childrenTree = this.getChildrenTree();
    const cols = this.getColArray().map((v, i) => {
      // do not remove ${prefixCls}-main-item
      return (
        <div key={i} className={`${prefixCls}-item ${prefixCls}-main-item`}>
          <Picker
            itemStyle={pickerItemStyle}
            disabled={disabled}
            prefixCls={pickerPrefixCls}
            selectedValue={value[i]}
            onValueChange={this.onValueChange.bind(this, i)}
          >
            {childrenTree[i] || []}
          </Picker>
        </div>
      );
    });
    return (
      <div className={cascaderCls}>
        {cols}
      </div>
    );
  }

  //生产版本可以注释掉,用于优化大小
  static propTypes = cascaderProps;

  static defaultProps = cascaderDefaultProps;

}


