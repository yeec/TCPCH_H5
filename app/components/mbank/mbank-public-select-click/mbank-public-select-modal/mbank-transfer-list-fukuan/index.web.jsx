import React from 'react';
import PureRenderHoc from '../../../../../util/hoc/index';
import MbankAccountIcon from './../../../mbank-public-icon/index.web.jsx';
import Radio from '../../../../../components/Base/radio/index.web.js';
import Common from "../../../../../util/common.jsx"
import './style/index.web';

class MbankTransferListFK extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: this.props.items,
      radioName: this.props.radioname,
      currentClass: "ryt-modal-btn mbank-transfer-list-fukuan-item",
      radioCheckFlag: false
    }
  }
  componentDidMount(){
    let that = this;
    if(that.state.Now === "1"){
      that.setState({
        currentClass: "ryt-modal-btn mbank-transfer-list-fukuan-item mbank-transfer-list-fukuan-active",
        radioCheckFlag: true
      })
    }else{
      that.setState({
        currentClass: "ryt-modal-btn mbank-transfer-list-fukuan-item",
        radioCheckFlag: false
      })
    }
  }
  componentWillReceiveProps(nextProps){
    let that = this;
    that.setState({
      cardNum: nextProps.cardnum,
      Now: nextProps.now,
      Name: nextProps.name
    })
    if(nextProps.now === "1"){
      that.setState({
        currentClass: "ryt-modal-btn mbank-transfer-list-fukuan-item mbank-transfer-list-fukuan-active",
        radioCheckFlag:true
      })
    }else{
      that.setState({
        currentClass: "ryt-modal-btn mbank-transfer-list-fukuan-item",
        radioCheckFlag: false
      })
    }
  }
  showOwnAccount(){
  
  }
  inputNow(index){
    let that = this;
    let all = that.state.Items.map((item,i) => {
      let itemobj = JSON.parse(item);
      itemobj.now = "0";
      if(i === index){
        itemobj.now = "1";
      }
      return JSON.stringify(itemobj);
    });
    that.setState({
      Items: all
    })
    this.props.changekey(index);
    // console.log(index);
  }
  render() {
    let all = this.state.Items.map((item,index) => {
      let itemobj = JSON.parse(item);
      let cardnumnew = Common.setAccountNum(itemobj.accountNum);
      // console.log(itemobj);
      let currentClass = "mbank-transfer-list-fukuan-item";
      let radioCheckFlag = false;
      if(itemobj.now === "1"){
        currentClass = "mbank-transfer-list-fukuan-item mbank-transfer-list-fukuan-active";
        radioCheckFlag = true;
      }
      return (
        <div className="mbank-transfer-list-fukuan-itembox" key={index}>
          <div className={currentClass}>
            <div className="mbank-transfer-list-fukuan-item-icon">
              <MbankAccountIcon size="lg" className="mbank-icon-bank-huishang"/>
            </div>
            <div className="mbank-transfer-list-fukuan-item-name"><span>{cardnumnew +"|" +itemobj.name}</span>
            </div>
            <div className="mbank-transfer-list-fukuan-item-Choice">
              <Radio.RadioList radioProps={{name:this.state.radioName, value:radioCheckFlag}} onTap={this.inputNow.bind(this, index)}/>
            </div>
          </div>
        </div>

      );
    })
    return (
      <div>{all}</div>
    );
  }
}
MbankTransferListFK.propTypes = {
    items: React.PropTypes.any,
    changekey: React.PropTypes.any,
    radioname: React.PropTypes.string
};

MbankTransferListFK.defaultProps = {
    items: {},
    changekey: 0,
    radioname: ""
};

export default PureRenderHoc(MbankTransferListFK);

