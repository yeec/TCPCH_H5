import React from 'react';
import './style/index.web';

const prefixCls = 'mbank-public-bottom-tips';
const MbankPublicTips = function (props, context) {

    const {
        title,
        content,
        ...others
    } = props;

    return (
        <div className={`${prefixCls}`}>
            <div className={`${prefixCls}-cut`}>
                <div></div>
                {title ? <span>{title}</span> : null}
                <div></div>
            </div>
            <div className={`${prefixCls}-content`}>{content}</div>
        </div>
    )
};

export default MbankPublicTips;