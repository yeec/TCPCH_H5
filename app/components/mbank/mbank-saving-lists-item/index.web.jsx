import React from 'react';
import './style/index.web';
const MbankSavingListsItem = function (props, context) {

    const {
        leftContent,
        amount,
        endDate,
        rightContent,
        onClick,
        isHost,
        ...others
    } = props;

    return (
        <div className="mbank-savings-list-item" onClick={onClick}>
            <div className="mbank-savings-list-item-header">
                <div>
                    <div>{leftContent}</div>
                    {/* {isHost == '1' ? <span><Icon size="xs" name="zhuzhanghu" />主账户</span> : null} */}
                </div>
                <div><span>{endDate}</span></div>
            </div>
            <div className="mbank-savings-list-item-content">
                <div><p>{amount}</p><span>金额(元)</span></div>
                <div><p>{rightContent}</p><span>账户状态</span></div>
            </div>
        </div>
    )
};

export default MbankSavingListsItem;
