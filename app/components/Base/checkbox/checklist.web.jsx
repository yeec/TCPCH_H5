import React, {PropTypes} from 'react';
import PureRenderHOC from '../../../util/hoc/index';

import Cell from './../cell/cell.web';
import CheckboxItem from './checkbox.web';

const CheckboxList = (props) => {
  let {
    checkboxProps,
    thumb,
    onTap,
    ...others
  } = props;

  const id = Math.random().toString(36).substr(2);

  const _onChange = checkboxProps.onChange || function () {};

  const onChange = (chekced, event) => {
    _onChange(chekced, event);
    onTap && onTap(chekced, event);
  };

  checkboxProps.onChange = onChange;

  return (
    <Cell {...others} thumb={<CheckboxItem {...checkboxProps} id={id} />} htmlFor={id}/>
  );
};
CheckboxList.propTypes = {
  checkboxProps: PropTypes.object
};

CheckboxList.defaultProps = {
  checkboxProps: {}
};

export default PureRenderHOC(CheckboxList);
