import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

class Tag extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {className, ...others} = this.props;
    const cls = classNames('mbank-public-tag',
      {[className]: className});

    return (
      <em {...others} className={cls} />
    );
  }
}

export default PureRenderHoc(Tag);