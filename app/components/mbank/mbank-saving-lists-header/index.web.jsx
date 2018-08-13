import React from 'react';
import './style/index.web';

const MbankSavingListsHeader = function (props, context) {

    const {
        count,
        savingType,
        ...others
    } = props;

    return (
        <div className="mbank-savings-list-header">
            <div className="mbank-savings-list-header-line"></div>
            <div className="mbank-savings-list-header-title">总共<span>{count}笔</span>{savingType}</div>
            <div className="mbank-savings-list-header-line"></div>
        </div>
    )
};

export default MbankSavingListsHeader;
