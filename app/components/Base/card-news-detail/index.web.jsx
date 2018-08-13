/**
 * component: card
 * description: 分为card card.header card.body card.footer; 各个组件props见源码
 * version: 1.0.0
 * author: ray
 * date: 20160830
 */
import React, { PropTypes } from 'react';
import './style/index.web';
import Common from '../../../util/common.jsx'
const prefixCls = 'ryt-card-news-detail';

const CardNewsDetail = function (props, context) {
    let {
        className,
        title,
        date,
        content,
        img,
        authore,
        dateNew,
    } = props;

    if (!Common.judgeEmpty(props.date)) {
        dateNew =
            props.date.slice(0, 4) + "-" +
            props.date.slice(4, 6) + "-" +
            props.date.slice(6, 8) + " " +
            props.date.slice(8, 10) + ":" +
            props.date.slice(10, 12) + ":" +
            props.date.slice(12, 14);
    }

    if (!Common.judgeEmpty(props.date)) {
        var dateNews = props.date.substring(0, 8);
        dateNews = dateNews.slice(0, 4) + "年" + dateNews.slice(4, 6) + "月" + dateNews.slice(6, 8) + "日";
    }

    return (
        <div className={`${prefixCls}`}>
            <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-header-content`}><span>{title}<p>{dateNews}</p></span></div>
            </div>
            <div className={`${prefixCls}-body`}>
                {img ? <img src={img} /> : null}

                {content}
            </div>
            <div className={`${prefixCls}-footer`}>
                <div className={`${prefixCls}-footer-description`}>{authore}</div>
            </div>
        </div>
    )
};


export default CardNewsDetail;