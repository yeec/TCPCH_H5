import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

class Icon extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {name, size, className, ...others} = this.props;
    const cls = classNames('ryt-icon',
      [`ryt-icon-${size}`]: size,
      `ryt-icon-${name}`,
      {[className]: className});

    return (
      <i {...others} className={cls} />
    );
  }
}

Icon.propTypes = {
  size: React.PropTypes.oneOf(['xxs','xs','sm','md','l','xl','lg'])
};
Icon.defaultProps = {
  size: 'md'
};
export default PureRenderHoc(Icon);