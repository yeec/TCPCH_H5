import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

class SegmentButton extends React.Component {

  constructor(props) {
    super(props);
  }
  
  ClickHandle1(e){
    this.props.onChange1 ? this.props.onChange1() : null;
    e.stopPropagation();
  }

  ClickHandle2(e){
    this.props.onChange2 ? this.props.onChange2() : null;
    e.stopPropagation();
  }
  render() {
    const {title1, title2, active, active1, active2, onChange1, onChange2, ...others} = this.props;
    const cls1 = classNames('ryt-segment-button-tab',
      active1 ? "ryt-segment-button-tab-active" : "");
    const cls2 = classNames('ryt-segment-button-tab',
      active2 ? "ryt-segment-button-tab-active" : "");
    return (
      <div className="ryt-segment-button ryt-segment-button-top">
        <div className="ryt-segment-button-bar">
          <div className={cls1} onClick={this.ClickHandle1.bind(this)}>{title1}</div>
          <div className={cls2} onClick={this.ClickHandle2.bind(this)}>{title2}</div>
        </div>
      </div>
    );
  }
}

SegmentButton.propTypes = {
  onChange1: React.PropTypes.any,
  onChange2: React.PropTypes.any
};
SegmentButton.defaultProps = {
  onChange1: null,
  onChange2: null
};
export default PureRenderHoc(SegmentButton);
