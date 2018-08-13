import React from "react";
import PureRenderHoc from "../../../util/hoc/index";
import Common from "../../../util/common.jsx";
import "./style/index.web";

class MbankPublicResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      title: this.props.title,
      titleSmall: this.props.titleSame,
      titleGrey: this.props.titleGrey,
      message: this.props.message,
      tMessage: this.props.tMessage,
      ljOpen: this.props.ljOpen,
      Small: this.props.Small,
      money: Common.setMoneyFormat(this.props.money),
      ljMoney: Common.setMoneyFormat(this.props.ljMoney),
      moneyBox: this.props.money ? { display: "block" } : { display: "none" },
      skName: this.props.skName,
      skNum: this.props.skNum,
      fkcard: this.props.fkcard
    };
  }
  componentWillReceiveProps(nextProps) {
    let that = this;
    that.setState({
      type: nextProps.type,
      title: nextProps.title,
      titleSame: nextProps.titleSame,
      titleGrey: nextProps.titleGrey,
      message: nextProps.message,
      tMessage: nextProps.tMessage,
      ljOpen: nextProps.ljOpen,
      money: Common.setMoneyFormat(nextProps.money),
      ljMoney: Common.setMoneyFormat(nextProps.ljMoney),
      moneyBox: nextProps.money ? { display: "block" } : { display: "none" },
      skName: nextProps.skName,
      skNum: nextProps.skNum,
      fkcard: nextProps.fkcard
    });
  }

  render() {
    let title = this.state.title;
    let titleSame = this.state.titleSame;
    let titleGrey = this.state.titleGrey;
    let message = this.state.message;
    let tMessage = this.state.tMessage;
    let ljOpen = this.state.ljOpen;
    let Small = this.state.Small;
    let money = this.state.money;
    let ljMoney = this.state.ljMoney;
    let type = this.state.type;
    let skName = this.state.skName;
    let skNum = this.state.skNum;
    let fkcard = this.state.fkcard;
    return (
      <div>
        {Small ? (
          <div className="mbank-public-result mbank-public-result-small">
            {title ? (
              <div className="mbank-public-result-title">{title}</div>
            ) : null}
            <div
              className="mbank-public-result-money"
              style={this.state.moneyBox}
            >
              ￥<span>{money}</span>元
            </div>
            {message ? (
              <div className="mbank-public-result-message">{message}</div>
            ) : null}
            {/* {tMessage ? (
              <div className="mbank-public-result-tMessage">
                转账给 <span>{skName}</span>
                <p>{skNum}</p>
                <p>{fkcard}</p>
              </div>
            ) : null} */}
            {tMessage ? (
              <div className="mbank-public-result-tMessage">
                <div>
                  转账给 <span>kkkk</span>
                </div>
                <b>12312312312312312</b>
                <p>asdfasdfasdfasdfkjklasdklf</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mbank-public-result">
            {type ? (
              <div className={`ryt-icon ryt-icon-xl-result ryt-icon-${type}`} />
            ) : null}
            {title ? (
              <div className="mbank-public-result-title">{title}</div>
            ) : null}
            {titleSame ? (
              <div className="mbank-public-result-titleSmall">{titleSame}</div>
            ) : null}
            {titleGrey ? (
              <div className="mbank-public-result-titleGrey">{titleGrey}</div>
            ) : null}
            <div
              className="mbank-public-result-money"
              style={this.state.moneyBox}
            >
              ￥<span>{money}</span>元
            </div>
            {message ? (
              <div className="mbank-public-result-message">{message}</div>
            ) : null}
            {ljOpen ? (
              <div className="mbank-public-result-message2">
                <div>
                  恭喜您,随机支付立减活动,为您减掉了以下金额！
                </div>
                <b>- <span>{ljMoney}</span>元</b>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
MbankPublicResult.propTypes = {
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  titleSame: React.PropTypes.string,
  Small: React.PropTypes.bool,
  titleGrey: React.PropTypes.string,
  message: React.PropTypes.element,
  tMessage: React.PropTypes.bool,
  money: React.PropTypes.string
};

MbankPublicResult.defaultProps = {
  type: "",
  title: "",
  titleSame: "",
  titleGrey: "",
  money: "",
  Small: false
};

export default PureRenderHoc(MbankPublicResult);
