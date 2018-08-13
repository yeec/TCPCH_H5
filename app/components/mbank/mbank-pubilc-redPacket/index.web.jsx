import React from "react";
import "./style/index.web";
import formatMoney from "../../../util/common/accounting-js/formatMoney.js";
import Common from "../../../util/common.jsx";
export default class MbankRedPacket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: false
    };
  }

  // 向父组件传递值并调用方法
  //   open = () => {
  //     this.setState({ index: true });
  //   };
  render() {
    const { props } = this;
    const {
      title,
      onTap,
      closeRedPacket,
      redPacketMoney,
      content,
      ...others
    } = props;
    const prefixCls = "mbank-red-packet";
    return (
      <div className={`${prefixCls}`}>
        {Common.judgeEmpty(redPacketMoney) ? 
        (
          <div className={`${prefixCls}-close`} onClick={onTap} />
        ) : 
        (
          <div className={!Common.judgeEmpty(redPacketMoney) ? "mbank-red-packet-open mbank-red-packet-movie":null} onClick={closeRedPacket}>
            <div>￥<span> {`${formatMoney(redPacketMoney, { symbol:""})}`}</span> 元</div>
          </div>
        )}
        <div className={`${prefixCls}-button`} onClick={closeRedPacket}>
          {content}
        </div>
      </div>
    );
  }
}
MbankRedPacket.propTypes = {
  onTap: React.PropTypes.func,
  closeRedPacket: React.PropTypes.func
};
