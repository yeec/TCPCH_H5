import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import Common from "../../../util/common.jsx";
import './style/index.web';

class StepsVertical extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startTitle: this.props.starttitle,
      startText: Common.setMoneyFormat(this.props.starttext),
      centerData: this.props.centerdata,
      endTitle: this.props.endtitle,
      endText: this.props.endtext
    }
    // console.log(props);
  }
  componentWillReceiveProps(nextProps){
    let that = this;
    this.state = {
      startTitle: nextProps.starttitle,
      startText: nextProps.starttext,
      centerData: nextProps.centerdata,
      endTitle: nextProps.endtitle,
      endText: nextProps.endtext
    }
  }
  render() {
    let centerHtml = this.state.centerData.map(function(item, i){
      return(
        <div className="ryt-steps-item ryt-steps-status-process" key = {i}>
          <div className="ryt-steps-tail"><i></i></div>
          <div className="ryt-steps-step">
            <div className="ryt-steps-head">
              <div className="ryt-steps-head-inner"><span className="ryt-steps-icon"></span></div>
            </div>
            <div className="ryt-steps-main">
              <div className="ryt-steps-title">{item.title}</div>
              <div className="ryt-steps-description">{item.text}</div>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="ryt-steps ryt-steps-vertical">
        <div className="ryt-steps-item ryt-steps-status-finish">
          <div className="ryt-steps-tail"><i></i></div>
          <div className="ryt-steps-step">
            <div className="ryt-steps-head">
              <div className="ryt-steps-head-inner">
                <span className="ryt-steps-icon"></span>
              </div>
            </div>
            <div className="ryt-steps-main">
              <div className="ryt-steps-title">{this.state.startTitle}</div>
              <div className="ryt-steps-description">转账<span>{this.state.startText}</span>元</div>
              <div className="ryt-steps-description">正等待收款行返回汇款结果</div>
            </div>
          </div>
        </div>
        {centerHtml}
        <div className="ryt-steps-item ryt-steps-status-wait ryt-steps-custom">
          <div className="ryt-steps-tail"><i></i></div>
          <div className="ryt-steps-step">
            <div className="ryt-steps-head">
              <div className="ryt-steps-head-inner"><span className="ryt-steps-icon"></span></div>
            </div>
            <div className="ryt-steps-main">
              <div className="ryt-steps-title">预计转出时间<span>{this.state.endTitle}</span></div>
              <div className="ryt-steps-description">{this.state.endText}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepsVertical.propTypes = {
  starttitle: React.PropTypes.string,
  starttext: React.PropTypes.string,
  centerdata: React.PropTypes.any,
  endtitle: React.PropTypes.string,
  endtext: React.PropTypes.string,
  
};
StepsVertical.defaultProps = {
  starttitle: "",
  starttext: "",
  centerdata: [],
  endtitle: "",
  endtext: "",
};
export default PureRenderHoc(StepsVertical);
