import React from 'react';
import './style/index.web';

const prefixCls = 'mbank-account-number';
const MbankAccountNumber = function (props, context) {
    
    const {
        title,
        accountNo,
        alias,
        ...others
    } = props;

    return (
        <div className={`${prefixCls}`}>
            <div className={`${prefixCls}-body`}>
                <div className={`${prefixCls}-body-content`}>
                    <div className={`${prefixCls}-item`}>
                        <div className={`${prefixCls}-line`}>
                            <div className={`${prefixCls}-content`}>
                                <div className="column-one"><span>{title}</span></div>
                                <div className="column-two"><span>{accountNo}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className={`${prefixCls}-item`}>
                        <div className={`${prefixCls}-line`}>
                            <div className={`${prefixCls}-content`}>
                                <div className="column-one"><span>别名</span></div>
                                <div className="column-two"><span>{alias}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MbankAccountNumber;