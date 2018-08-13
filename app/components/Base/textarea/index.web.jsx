/**
 * component: Textarea
 * description: Textarea
 * author: Lichuan
 */
import React, {PropTypes} from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import noop from '../../../util/common/noop';
import './style/index.web';

let defaultPrefixCls = 'ryt-textarea';
let defaultCellPrefixCls = 'ryt-cell';

let Textarea = (props) => {
  //参数
  let {
    style, title, name, value, defaultValue, placeholder, clear, rows, count,
    editable, disabled, error, className, labelNumber, onBlur, onFocus, onErrorClick} = props;

  let valueProps = (value !== undefined)?{value}:{defaultValue};

  //样式
  const prefixCls = props.prefixCls || defaultPrefixCls;
  const cellPrefixCls = props.cellPrefixCls || defaultCellPrefixCls;

  const textareaCls = classNames({
    [`${cellPrefixCls}`]: true,
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-item-single-line`]: rows === 1,
    [`${prefixCls}-error`]: error,
    [`${prefixCls}-focus`]: focus,
    [className]: className,
  });

  const labelCls = classNames({
    [`${prefixCls}-label`]: true,
    [`${prefixCls}-label-2`]: labelNumber === 2,
    [`${prefixCls}-label-3`]: labelNumber === 3,
    [`${prefixCls}-label-4`]: labelNumber === 4,
    [`${prefixCls}-label-5`]: labelNumber === 5,
    [`${prefixCls}-label-6`]: labelNumber === 6,
    [`${prefixCls}-label-7`]: labelNumber === 7,
  });

  //内部方法
  const onInputChange = (e) => {
    let value = e.target.value;
    const { onChange } = props;
    onChange(value);
  };

  const clearInput = () => {
    props.onChange('');
  };

  //模板
  return (
    <div className={textareaCls} style={style}>
      {title ? (<div className={labelCls}>{title}</div>) : null}
      <div className={`${prefixCls}-control`}>
          <textarea
            {...valueProps}
            name={name}
            rows={rows}
            placeholder={placeholder}
            maxLength={count}
            onChange={onInputChange}
            onBlur={onBlur}
            onFocus={onFocus}
            readOnly={!editable}
            disabled={disabled}
          />
      </div>
      {clear && editable && value && value.length > 0 ?
        (<div className={`${prefixCls}-clear`} onClick={clearInput} onTouchStart={clearInput} />)
        : null}
      {error ? (<div className={`${prefixCls}-error-extra`} onClick={onErrorClick} />) : null}
      {count > 0 && rows > 1
        ? (<span className={`${prefixCls}-count`}><span>{value.length}</span>/{count}</span>)
        : null}
    </div>
  )
};

//生产版本可以注释掉,用于优化大小
Textarea.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelNumber: PropTypes.oneOf([2, 3, 4, 5, 6, 7]),
};

Textarea.defaultProps = {
  prefixCls: 'ryt-textarea',
  cellPrefixCls: 'ryt-cell',
  title: '',
  editable: true,
  disabled: false,
  name: '',
  defaultValue: '',
  placeholder: '',
  clear: false,
  rows: 3,
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  onErrorClick: noop,
  error: false,
  labelNumber: 4,
};


export default PureRenderHoc(Textarea);
