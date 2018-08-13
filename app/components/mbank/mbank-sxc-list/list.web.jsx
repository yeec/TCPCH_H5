import React from 'react';
import './style/index.web';
import $ from 'jquery';
import $Fetch from '../../../fetch/fetch'
import API from '../../../constants/api'
import Icon from '../mbank-public-icon/index.web'
import Common from '../../../util/common.jsx'
import formatMoney from '../../../util/common/accounting-js/formatMoney.js';
import moment from 'moment';
import Button from '../../Base/button/index.web';

const MbankSavingSxcListItem = function (props, context) {

    const {
        title,
        explain,
        sum,
        buttonText,
        zglv,
        onClick,
        ...others
    } = props;

    return (
        <div className="mbank-sxc-list-new-item">
            <h3>{title}</h3>
            <p>{explain}</p>
            <div className="sum">{sum}<span>%</span></div>
            <span className="ll">{zglv}</span>
            <Button type="primary" onClick={onClick}>{buttonText}</Button>
        </div>
    )
};

export default MbankSavingSxcListItem;
