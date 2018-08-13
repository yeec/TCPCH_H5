/**
 * Created by lichuan on 16/10/12.
 */
import {PropTypes} from 'react';
import noop from '../../../util/common/noop';

const cascaderProps = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  pickerPrefixCls: PropTypes.string,
  pickerItemStyle: PropTypes.object,
  data: PropTypes.array,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  cols : PropTypes.oneOf([1,2,3,4,5]),
};


const cascaderDefaultProps = {
  className: '',
  prefixCls: 'apollo-cascader',
  pickerPrefixCls: 'rmc-picker',
  data: [],
  value: [],
  defaultValue: null,
  onChange: noop,
  cols: 3
};

export default {cascaderProps, cascaderDefaultProps};
