import React from 'react';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';
import Tag from '../../../../../../app/components/mbank/mbank-public-tag/index.web.jsx';
import Common from "../../../../../util/common.jsx";
import './style/index.web';

const prefixCls = 'mbank-account-detail';


export default class MbankAccountDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        let {
            className,

            accountNo,
            alias,
            accountStat,
            balance,
            usableBalance,
            ...others
        } = props;
        /**** 接口字段说明 
        openOrg  //开卡机构
        foldCardFlag  //账户类型: 卡折标志 (0-卡) (1-存折)( 2-卡折关联)
        accountNo  //账号
        alias //别名
        accountStat //签约状态: (0-未签约) (1-签约)
        accountSign //主账户: (0-非主账户)(1-主账户)
        balance //账户总额
        usableBalance //可用余额
        accountStatus //账户状态: (0-正常) (1-销户) (2-长期不动户) (3-不动转收益)
        bankName // 行名
        */
        return (
            <div className={`${prefixCls}`}>
                <div className={`${prefixCls}-body`}>
                    <div className={`${prefixCls}-body-content`}>
                        <div className={`${prefixCls}-item`}>
                            <div className={`${prefixCls}-line`}>
                                <div className={`${prefixCls}-content`}>
                                    <div className="alias"><span>{alias}</span></div>
                                    <div className="tagSmall">
                                    {(accountStat === "1") ?
                                        <div><i className="ryt-icon ryt-icon-xs ryt-icon-zhuzhanghu"></i>
                                            主账户
                                        </div>:null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${prefixCls}-item`}>
                            <div className={`${prefixCls}-line`}>
                                <div className={`${prefixCls}-content`}>
                                    <div className="card-num">{accountNo}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${prefixCls}-foot`}>
                    <div><span>{` ${formatMoney(balance, { symbol: '￥' })}`}</span>
                        <p>账户总额(元)</p>
                    </div>
                    <div></div>
                    <div><span>{` ${formatMoney(usableBalance, { symbol: '￥' })}`}</span>
                        <p>可用余额(元)</p>
                    </div>
                </div>
            </div>
        );
    }
}