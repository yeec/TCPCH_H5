import React from 'react';
import './style/index.web';
const MbankSavingListsItem = function (props, context) {

    const {
        time,
        amount,
        endDate,
        rate,
        onClick,
        isHost,
        ...others
    } = props;

    return (
        <div className="mbank-savings-list-item" onClick={onClick}>
            <div className="mbank-savings-list-item-header">
                <div>
                    <div>定期{time}</div>
                    {/* {isHost == '1' ? <span><Icon size="xs" name="zhuzhanghu" />主账户</span> : null} */}
                </div>
                <div><span>{endDate}到期</span></div>
            </div>
            <div className="mbank-savings-list-item-content">
                <div><p>{amount}</p><span>金额(元)</span> </div>
                <div><p>{rate}%</p><span>利率</span></div>
            </div>
        </div>
    )
};

export default MbankSavingListsItem;
