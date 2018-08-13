import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

class StepsHorizontal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stepsExrytple">
        <div className="ryt-steps ryt-steps-horizontal ryt-steps-label-vertical">
          <div className="ryt-steps-item ryt-steps-status-finish ryt-steps-custom">
            <div className="ryt-steps-tail"><i></i></div>
            <div className="ryt-steps-step">
              <div className="ryt-steps-head">
                <div className="ryt-steps-head-inner"><span className="ryt-steps-icon"></span></div>
              </div>
              <div className="ryt-steps-main">
                <div className="ryt-steps-title">第一步</div>
                <div className="ryt-steps-description">描述</div>
              </div>
            </div>
          </div>
          <div className="ryt-steps-item ryt-steps-status-process">
            <div className="ryt-steps-tail"><i></i></div>
            <div className="ryt-steps-step">
              <div className="ryt-steps-head">
                <div className="ryt-steps-head-inner"><span className="ryt-steps-icon"></span></div>
              </div>
              <div className="ryt-steps-main">
                <div className="ryt-steps-title">第二步</div>
                <div className="ryt-steps-description">描述</div>
              </div>
            </div>
          </div>
          <div className="ryt-steps-item ryt-steps-status-wait ryt-steps-custom ellipsis-item">
            <div className="ryt-steps-tail"><i></i></div>
            <div className="ryt-steps-step">
              <div className="ryt-steps-head">
                <div className="ryt-steps-head-inner"><span className="ryt-steps-icon"></span></div>
              </div>
              <div className="ryt-steps-main">
                <div className="ryt-steps-title">第三步</div>
                <div className="ryt-steps-description">描述</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepsHorizontal.propTypes = {
  
};
StepsHorizontal.defaultProps = {

};
export default PureRenderHoc(StepsHorizontal);
