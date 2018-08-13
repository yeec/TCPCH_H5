/**
 * component: CountingUp
 * description: CountingUp
 * author: Jason
 */
import React from 'react';
import classNames from 'classnames';
import CountUp from 'react-countup';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';
const prefixCls = 'ryt-number-roll';

const CountingUp = (props) => {
  const { className, ...others } = props;
  const cls = classNames({
    [prefixCls]: true,
    [className]: className
  });
  return <CountUp { ...others } className = { cls }
  />;
};


CountingUp.defaultProps = {
  start: 0,
  end: 0,
  duration: 2,
  useEasing: true,
  useGrouping: true,
  separator: ",",
  decimal: ".",
  decimals: 2,
  prefix: "",
  suffix: ""
};


export default PureRenderHoc(CountingUp);