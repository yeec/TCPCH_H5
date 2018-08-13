import React from 'react';
import PureRenderHoc from '../../../util/hoc/index';
import MbankAccountIcon from './../mbank-public-icon/index.web.jsx';
import Common from "../../../util/common.jsx"
import './style/index.web';

class MbankTransferOutItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: this.props.cardnum,
      Name: this.props.name,
      Money: this.props.money,
      showBoxFlag: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    let that = this;
    that.setState({
      cardNum: nextProps.cardnum,
      Name: nextProps.name,
      Money: nextProps.money
    })
  }
  showOwnAccount() {
    let that = this;
    if (this.state.showBoxFlag === 0) {
      that.setState({
        showBoxFlag: 1
      })
      that.props.showdetail(1);
    } else {
      that.setState({
        showBoxFlag: 0
      })
      that.props.showdetail(0);
    }
  }
  render() {
    let cardnumnew = Common.setAccountNum2(this.state.cardNum,true);
    let moneynew = Common.setMoneyFormat(this.state.Money);
    return (
      <div className="mbank-public-account-select" onClick={this.showOwnAccount.bind(this)}>
        <div className="mbank-public-account-select-body">
          <div className="mbank-public-account-select-item mbank-public-account-select-item-middle">
            <div className="mbank-public-account-select-line ">
              <div className="mbank-public-account-select-title">
                {this.props.itemName}
              </div>
              <div className="mbank-public-account-select-content">
                {/* <div className="mbank-public-account-select-content-icon"><MbankAccountIcon size="l" name={"logo-313684093748"} /></div> */}
                <div className="mbank-public-account-select-content-text">
                  {/* <div>{cardnumnew}({this.state.Name})</div> */}
                  <div>{cardnumnew}</div>
                  <div className="balance">
                    <div>余额￥{moneynew}<span>元</span></div>
                    <div><span className="button">更换银行卡</span></div>
                  </div>
                </div>
                {/* <div><MbankAccountIcon size="xs" name={"arrow-right"} /></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
MbankTransferOutItem.propTypes = {
  cardnum: React.PropTypes.string,
  name: React.PropTypes.string,
  money: React.PropTypes.string,
  showdetail: React.PropTypes.any,
  itemName: React.PropTypes.string,
};

MbankTransferOutItem.defaultProps = {
  cardnum: "",
  name: "",
  money: "",
  showdetail: "",
  itemName: "付款账户"
};

export default PureRenderHoc(MbankTransferOutItem);
