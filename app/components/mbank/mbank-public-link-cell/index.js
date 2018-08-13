import React, {PureComponent}from 'react';
import Cell from '../../../../app/components/Base/cell/index.web.js';
export default class LinkCell extends PureComponent {

  static defaultProps = {
    link: '/'
  };

  static contextTypes = {
    router: React.PropTypes.any
  };
  linkHandle = () => {
    this.context.router.push(this.props.link);
  };

  render() {
    const {link, onTap, ...others} = this.props;
    return (
        <Cell onTap={this.linkHandle} {...others} />
    )
  }
}

