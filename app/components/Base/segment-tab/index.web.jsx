/**
 * component: segment-tab
 * description: 参考ink-tab
 * author: Ray
 */
import React, {PropTypes} from 'react';
import RcTabs from 'rc-tabs';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

const prefixCls = 'ryt-segment-tabs';
let SegmentTab = (props) => {
  let {
    animation,
    children,
    transitionName,
    className,
    ...others
  } = props;
  if (!animation) {
    transitionName = {};
    animation = '';
  }

  const cls = classNames({
    [`${prefixCls}-no-animation`] : !animation,
    [className] : className
  });

  return (
    <RcTabs
      {...others}
      className={cls}
      prefixCls={prefixCls}
      allowScrollBar={false}
      transitionName={transitionName}
      allowInkBar={false}
    >
      {
        children
      }
    </RcTabs>
  )
};

SegmentTab.propTypes = {
  animation:PropTypes.bool,
  onChange: PropTypes.func,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  transitionName: PropTypes.object
};

SegmentTab.defaultProps = {
  animation: true,
  transitionName: {
    backward : 'ryt-am-slide-horizontal-backward',
    forward: 'ryt-am-slide-horizontal-forward'
  }
};

SegmentTab = PureRenderHoc(SegmentTab);


const Panel = (props) => {
  return (
    <RcTabs.TabPane {...props}/>
  )
};

Panel.propTypes = {
  tab: PropTypes.string,
  disabled: PropTypes.bool
};

Panel.defaultProps = {
  disabled: false
};

SegmentTab.Panel = PureRenderHoc(Panel);
export default SegmentTab;

