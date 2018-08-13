/**
 * component: card
 * description: 分为card card.header card.body card.footer; 各个组件props见源码
 * version: 1.0.0
 * author: ray
 * date: 20160830
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';
//公共方法
import Common from "../../../util/common.jsx";

const prefixCls = 'ryt-card-news';

let CardNews = (props) => {
  const {
    className,
    children,
    ...others
  } = props;
  const cls = classNames({
    [prefixCls]: true,
    [className]: className
  });

  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};

CardNews = PureRenderHoc(CardNews);


const CardHeader = (props) => {
  const {
    className,
    content,
    thumb,
    description,
    contentSize,
    descriptionSize,
    ...others
  } = props;
  const cls = classNames({
    [`${prefixCls}-header`]: true,
    [className]: className
  });

  return (
    <div className={cls} {...others}>
      {
        thumb ? (React.isValidElement(thumb) ? { thumb } : <img src={thumb} className={`${prefixCls}-header-thumb`} />) : null
      }
      <div className={`${prefixCls}-header-content`} style={{ flex: contentSize }}>
        {content}
      </div>
      {
        description ?
          <div className={`${prefixCls}-header-description`} style={{ flex: descriptionSize }}>
            {description}
          </div> : null
      }
    </div>
  );
};


CardHeader.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  contentSize: PropTypes.number,
  descriptionSize: PropTypes.number
};

CardHeader.defaultProps = {
  contentSize: 1,
  descriptionSize: 1
};

const CardBody = (props) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classNames({
    [`${prefixCls}-body`]: true,
    [className]: className
  });
  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};

const CardFooter = (props) => {
  const {
    className,
    content,
    description,
    contentSize,
    descriptionSize,
    ...others
  } = props;
  const cls = classNames({
    [`${prefixCls}-footer`]: true,
    [className]: className
  });
  if (!Common.judgeEmpty(props.content)) {
    var dateNews = props.content.substring(0, 8);
    dateNews = dateNews.slice(0, 4) + "年" + dateNews.slice(4, 6) + "月" + dateNews.slice(6, 8) + "日";
  }
  return (
    <div className={cls} {...others}>
      {
        content ?
          <div className={`${prefixCls}-footer-content`} style={{ flex: contentSize }}>
            {dateNews}
          </div> : null
      }
      {
        description ?
          <div className={`${prefixCls}-footer-description`} style={{ flex: descriptionSize }}>
            {description}
          </div> : null
      }
    </div>
  );
};

CardFooter.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  contentSize: PropTypes.number,
  descriptionSize: PropTypes.number
};

CardFooter.defaultProps = {
  contentSize: 1,
  descriptionSize: 1
};

CardNews.Header = PureRenderHoc(CardHeader);
CardNews.Body = PureRenderHoc(CardBody);
CardNews.Footer = PureRenderHoc(CardFooter);


export default CardNews;