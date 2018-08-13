import React from 'react';
import './style/index.web';
const MbankJhsBListsItem = function (props, context) {

    const {
        money,
        rate,
        number,
        endDate,
        onClick,
        ...others
    } = props;

    return (
        <div className="mbank-sxc-list-item">
            <div className="mbank-sxc-list-item-header">
                <div>¥{money}</div>
            </div>
            <div className="mbank-sxc-list-item-content">
                <div><p>{rate}%</p><span>利率</span> </div>
                <div><p>{number}</p><span>存期</span></div>
                <div><p>{endDate}</p><span>到期日</span> </div>
            </div>
            <div className="mbank-sxc-list-item-button" onClick={onClick}>
                <span>签约</span>
            </div>
        </div>
    )
};

export default MbankJhsBListsItem;
