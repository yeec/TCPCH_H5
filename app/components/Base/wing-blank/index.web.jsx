import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

class WingBlank extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {name, size, className, children, ...others} = this.props;
    const cls = classNames('ryt-wingblank',
      [`ryt-wingblank-${size}`]: size,
      {[className]: className});

    return (
      <div {...others} className={cls}>{children}</div>
    );
  }
}

WingBlank.propTypes = {
  size: React.PropTypes.oneOf(['xs','sm','md','lg','xl','xxl'])
};
WingBlank.defaultProps = {
  size: 'md'
};
export default PureRenderHoc(WingBlank);