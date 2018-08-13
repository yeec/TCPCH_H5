import React from 'react';
import classNames from 'classnames';
import Slider from 'react-slick';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

const prefixCls = 'ryt-carousel';

const Carousel = (props) => {
  const {className, ...others} = props;
  const cls = classNames({
    [prefixCls]:true,
    [className]:className
  });
  return <Slider {...others} className={cls}/>;
};

Carousel.defaultProps = {
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 10000,
  speed: 500,
  draggable: false,
  lazyLoad: false,
  slidesToShow: 1,
  slidesToScroll: 1
};


export default PureRenderHoc(Carousel);