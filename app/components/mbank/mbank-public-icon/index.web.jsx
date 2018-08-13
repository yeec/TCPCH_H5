import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';
class MbankAccountIcon extends React.Component {

  constructor(props) {
    super(props);
  }
  clickHandle(){
    this.props.onclick ? this.props.onclick() : null;
  }
  render() {
    const {name, size, className, iconn, onclick, ...others} = this.props;
    const cls = classNames('ryt-icon',
      [`ryt-icon-${size}`]: size,
      `ryt-icon-${name}`,
      {[className]: className});

    return (
      <i {...others} id={iconn} className={cls} onClick={this.clickHandle.bind(this)}/>
    );
  }
}

MbankAccountIcon.propTypes = {
  size: React.PropTypes.oneOf(['xxs','xs','sm','md','l','xl','lg']),
  onclick: React.PropTypes.any
};
MbankAccountIcon.defaultProps = {
  size: 'md',
  onclick: null
};
export default PureRenderHoc(MbankAccountIcon);