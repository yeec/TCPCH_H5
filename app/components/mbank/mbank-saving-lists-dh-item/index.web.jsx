import React from 'react';
import './style/index.web';
import Icon from '../mbank-public-icon/index.web';
const MbankSavingListsItem = function (props, context) {

    const {
        leftContent,
        amount,
        endDate,
        rightContent,
        onClick,
        isHost,
        guimian,
        ...others
    } = props;

    return (
        <div className="mbank-savings-list-item" onClick={onClick}>
            <div className="mbank-savings-list-item-header">
                <div>
                    <div>{leftContent}</div><div>{guimian}</div>
                </div>
                <div><Icon size="xs" name="arrow-right" /></div>
            </div>
            <div className="mbank-savings-list-item-content">
                <div><p>{amount}</p><span>金额(元)</span></div>
                <div><p>{endDate}</p><span>到期日</span></div>
            </div>
        </div>
    )
};

export default MbankSavingListsItem;
