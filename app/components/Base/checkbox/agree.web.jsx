import React, {PropTypes} from 'react';
import classNames from 'classnames';
import PureRenderHOC from '../../../util/hoc/index';

import CheckboxItem from './checkbox.web';

const prefixCls = 'ryt-checkbox-agree';

const Agree = (props) => {
  const {
    children,
    className,
    ...others
  } = props;

  const cls = classNames({
    [prefixCls]: true,
    [className]: className
  });

  return (
    <div className={cls}>
      <CheckboxItem {...others}/>
      <label htmlFor="">
        {children}
      </label>
    </div>
  );

};


export default PureRenderHOC(Agree);