import React from 'react';
import Tappable from 'react-tappable';
import classNames from  'classnames';
import debounce from 'lodash/debounce';
import Icon from '../../mbank/mbank-public-icon/index.web.jsx';

const Button = (props) => {
  const {
      type,
      size,
      disabled,
      active,
      className,
      inline,
      onTap,
      icon,
      children,
      debounced,
      ...others
  } = props;
  const cls = classNames('ryt-button', {
    [`ryt-button-${type}`]: type,
    // [`ryt-button-plain-${type}`]: active,
    'ryt-button-active': active,
    'ryt-button-small': size === 'small',
    'ryt-button-inline': inline,
    'ryt-button-disabled': disabled,
    [className]: className
  });
  return (
    <Tappable {...others}
      onTap={disabled ? null : (debounced ? debounce(onTap, 500): onTap)}
      className={cls}
      disabled={disabled}
      component="div"
    >{icon ? <Icon name={icon}></Icon> : null}<span>{children}</span></Tappable>
  )
};

Button.propTypes = {
  type: React.PropTypes.oneOf(['primary','ghost','ghost-gray','warning']),
  size: React.PropTypes.oneOf(['small','default']),
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  className: React.PropTypes.string,
  onTap: React.PropTypes.func
};

Button.defaultProps = {
  // type: 'default',
  size: 'default',
  // plain: false,
  inline: false,
  disabled: false
};

export default Button;