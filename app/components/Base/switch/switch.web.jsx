import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
import PureRenderHOC from '../../../util/hoc/index';


const prefixCls = 'ryt-switch';

const Switch = (props) => {
  const {
    disabled,
    name,
    value,
    defaultValue,
    onChange,
    className,
    onClic,
    styleColo,
    ...others
    
  } = props;

  const cls = classNames({
    [prefixCls]: true,
    [`${prefixCls}-disabled`]: disabled,
    [className]: className
  });

  const changeHandle = (e) => {
    let value = e.target.checked;
    onChange && onChange(value, e);
    e.stopPropagation();
  };

  return (
    <div className ="Tappable-inactive ryt-list-item ryt-list-item-middle">
      <div className="ryt-list-line">
        <div className="ryt-list-content">
          <span>一键锁卡/解锁</span>
        </div>
        <div className="ryt-list-button">
          <span onClick={onClic} className="link ryt-list-button-span">设置</span>
        </div>
        <div classNam="ryt-list-arrow ryt-list-arrow-horizontal">
        <input
      {...others}
      type="checkbox"
      name={name}
      className={cls}
      checked={value}
      defaultChecked={defaultValue}
      onChange={changeHandle}
      style={styleColo}
      {...(disabled ? {disabled: 'true'} : '')}
    />
        </div>
      </div>
    </div>
    
  );
};
export default PureRenderHOC(Switch);

