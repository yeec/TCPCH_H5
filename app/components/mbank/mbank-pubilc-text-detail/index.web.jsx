/**
 * component: card
 * description: 分为card card.header card.body card.footer; 各个组件props见源码
 * version: 1.0.0
 * author: ray
 * date: 20160830
 */
import React from 'react';
import classNames from 'classnames';
import './style/index.web';

const prefixCls = ' mbank-public-text-detail';

const mbankPublicTextDetail = function (props, context) {
  const {
    className,
    title,
    date,
    content,
    img,
    authore,
    ...others
    } = props;


  const cls = classNames({
    [`${prefixCls}`]: true,
    [className]: className
  });

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-content`}><span>{title}<p>{date}</p></span></div>
      </div>
      <div className={`${prefixCls}-body`}>
        <p>{content}</p>
      </div>
      <div className={`${prefixCls}-footer`}>
        <div className={`${prefixCls}-footer-description`}>{authore}</div>
      </div>
    </div>
  )
};
mbankPublicTextDetail.propTypes = {
  content:React.PropTypes.element,
};

export default mbankPublicTextDetail;