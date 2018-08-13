import React,{PropTypes} from 'react';
import Icon from '../icon/index.web.jsx';
import Tappable from 'react-tappable';
import classNames from  'classnames';

const backIcon = 'back';
const prefixCls = 'ryt-navigator';

const Navigator = (props) => {
  let {
    leftText,
    leftIcon,
    leftTap,
    rightText,
    rightIcon,
    rightTap,
    back,
    leftContent,
    rightContent,
    children,
    type,
    className,
    ...others
  } = props;
  if (back) {
    leftText = '';
    leftIcon = backIcon;
  }

  const cls = classNames({
    [prefixCls] : true,
    [`${prefixCls}-${type}`] : true,
    [className] : className
  });


  const renderLeft = leftContent ? leftContent : (
    <Tappable component="div" onTap={leftTap}>
      {
        leftIcon ?
          <span className={`${prefixCls}-left-icon`}>
            <Icon type={leftIcon}/>
          </span> : null
      }
      <span className={`${prefixCls}-left-text`}>
        {leftText}
      </span>
    </Tappable>
  );


  const renderRight = rightContent ? rightContent : (
    <Tappable component="div" onTap={rightTap}>
      <span className={`${prefixCls}-right-text`}>
        {rightText}
      </span>
      {
        rightIcon ?
          <span className={`${prefixCls}-right-icon`}>
            <Icon type={rightIcon}/>
          </span> : null
      }
    </Tappable>
  );


  return (
    <header {...others} className={cls}>
      <div className={`${prefixCls}-left`}>
        {renderLeft}
      </div>
      <div className={`${prefixCls}-title`}>
        {children}
      </div>
      <div className={`${prefixCls}-right`}>
        {renderRight}
      </div>
    </header>
  );


};

Navigator.propTypes = {
  leftText: PropTypes.string,
  leftIcon: PropTypes.string,
  leftTap: PropTypes.func,
  rightText: PropTypes.string,
  rightIcon: PropTypes.string,
  rightTap: PropTypes.func,
  back:PropTypes.bool,
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  children: PropTypes.any,
  type:PropTypes.oneOf(['dark','light','default'])
};

Navigator.defaultProps = {
  type: 'default'
};


export default Navigator;