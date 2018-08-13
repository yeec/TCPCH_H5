/**
 * Created by lichuan on 16/10/12.
 */
import {PropTypes} from 'react';
import noop from '../../../util/common/noop';


const inputProps = {
  type: PropTypes.oneOf(['text', 'bankCard', 'phone', 'password', 'number']),
  labelNumber: PropTypes.oneOf([2, 3, 4, 5, 6, 7]),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
};

const inputDefaultProps = {
  prefixCls: 'ryt-input',
  cellPrefixCls: 'ryt-cell',
  type: 'text',
  name: '',
  defaultValue: '',
  editable: true,
  disabled: false,
  placeholder: '',
  clear: false,
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  extra: '',
  onExtraClick: noop,
  error: false,
  onErrorClick: noop,
  labelNumber: 4,
  labelTextAlign: 'left',
  textAlign: 'left',
};

export default {inputProps, inputDefaultProps};
