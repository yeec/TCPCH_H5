import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

class WhiteSpace extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {size, className, ...others} = this.props;
    const cls = classNames('ryt-whitespace',
      [`ryt-whitespace-${size}`]: size,
      {[className]: className});

    return (
      <div {...others} className={cls} ></div>
    );
  }
}

WhiteSpace.propTypes = {
  size: React.PropTypes.oneOf(['xs','sm','md','lg','xl','xxl'])
};
WhiteSpace.defaultProps = {
  size: 'md'
};
export default PureRenderHoc(WhiteSpace);