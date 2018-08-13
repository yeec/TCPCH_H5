import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
import PureRenderHOC from '../../../util/hoc/index';
import './style/index.web';
import '../cell/style/index.less';

const prefixCls = 'ryt-switch';

const SwitchLis = function (props, context) {

  const {
    disabled,
    title,
    name,
    value,
    defaultValue,
    onChange,
    className,
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
        <div>
          <label className="Tappable-inactive ryt-cell">
            <div className="ryt-cell-content">
              <div className="ryt-cell-content-title-area">
                <div className="ryt-cell-content-title">{title}</div>
              </div>
              <div className="ryt-cell-content-description-area">
                <div className="ryt-cell-content-description">
                  <input
                    {...others}
                    type="checkbox"
                    name={name}
                    className={cls}
                    checked={value}
                    defaultChecked={defaultValue}
                    onChange={changeHandle}
                    {...(disabled ? {disabled: 'true'} : '')}
                  />
                </div>
              </div>
            </div>
          </label>
          {/* <Switch value={this.state.switch1Checked} onChange={this.changeHandle}/> */}
        </div>
        )

}
export default SwitchLis;
