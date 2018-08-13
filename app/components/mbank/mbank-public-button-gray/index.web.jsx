import React from 'react';
import './style/index.web';
import ButtonBox from '../mbank-public-button-box/index.web'//获取ButtonBox里面的类名(mbank-public-button)样式


const MbankPublicButtonGray = function (props, context) {
    const {
        children,
        onClick,
        ...others
    } = props;

    return (
        <div className="mbank-public-button mbank-public-button-gray" onClick={onClick}>
            <i className="ryt-icon ryt-icon-md ryt-icon-circle-add"></i><span>{children}</span>
        </div>
    )
};


export default MbankPublicButtonGray;
