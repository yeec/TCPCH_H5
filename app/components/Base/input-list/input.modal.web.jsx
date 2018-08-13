import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import noop from '../../../util/common/noop';
import './style/index.web';
import Tappable from 'react-tappable';

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      rightExtra: this.props.rightExtra
    };
  }

  render() {
    //参数
    const {
      style, children, className, labelNumber, onExtraClick, rightExtra, ExtraIconSuffix, selectInput, selectText, onTap ,disabled} = this.props;

    let rightText = '';
    const defaultInputCls = 'ryt-input';

    const cls = classNames({
      'ryt-input-list-item': true,
      'ryt-input-item': true
    });

    const labelCls = classNames({
      'ryt-input-label': true,
      [`${defaultInputCls}-label-2`]: labelNumber === 2,
      [`${defaultInputCls}-label-3`]: labelNumber === 3,
      [`${defaultInputCls}-label-4`]: labelNumber === 4,
      [`${defaultInputCls}-label-5`]: labelNumber === 5,
      [`${defaultInputCls}-label-6`]: labelNumber === 6,
      [`${defaultInputCls}-label-7`]: labelNumber === 7
    });

    const inputCls = classNames({
      'ryt-input-control': true
    });

    // 选择/录入框的外层盒子样式
    const boxStyle = {
      'display': 'flex',
      'alignItems': 'center',
      'width': '100%'
    };

    //模板
    return (
      <div className={cls}>
        <Tappable onTap={disabled ? null : onTap} style={boxStyle} component="label">
          {children ? (<div className={labelCls}>{children}</div>) : null}
          <div className={inputCls}>
            <div>{selectText}</div>
          </div>
          {rightText !== '' ? <div className="ryt-input-text">{rightText}</div> : null}
          {this.state.rightExtra ? <div className="ryt-input-extra">
            {ExtraIconSuffix ? <div className="ryt-icon ryt-icon-xs ryt-icon-arrow-right" onClick={onExtraClick}></div> : null}
          </div> : null}
        </Tappable>
      </div>
    );
  }

  //生产版本可以注释掉,用于优化大小
  static propTypes = {
    labelNumber: PropTypes.oneOf([2, 3, 4, 5, 6, 7])
  };

  static defaultProps = {
    prefixCls: 'ryt-input',
    cellPrefixCls: 'ryt-cell',
    onExtraClick: noop,
    labelNumber: 4,
    rightText: '',
    rightExtra: false,
    ExtraIconSuffix: false,
    selectText: '',
    onTap: noop,
    disabled: false
  };
}

Input = PureRenderHoc(Input);


export default Input;