/**
 * component: tab-bar
 * description: 参考ink-tab
 * author: Ray
 */
import React, {PropTypes} from 'react';
import RcTabs from 'rc-tabs';
import Icon from './../icon/index.web.jsx';
import Badge from './../badge/index.web.jsx';
import classNames from 'classnames';
import './style/index.web';
import PureRenderHoc from '../../../util/hoc/index';

const prefixCls = 'ryt-tab-bar';
let TabBar = (props) => {
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
    [`${prefixCls}-no-animation`]: !animation,
    [className]: className
  });

  return (
    <RcTabs
      {...others}
      className={cls}
      prefixCls={prefixCls}
      allowScrollBar={false}
      transitionName={transitionName}
      allowInkBar={false}
      tabPosition="bottom"
    >
      {
        children.map((child)=> {
          const props = child.props;
          const {tab, text, icon, content, children, hasBadge, badgeType, badgeText, badgeMaxNum, ...others} = props;
          const tabContent =
            <div className={`${prefixCls}-item ${hasBadge?'':`${prefixCls}-no-badge`}`}>
              <Badge type={badgeType} text={badgeText} maxNum={badgeMaxNum} small>
                {
                  tab ? tab : <div>
                    {
                      React.isValidElement(icon) ? icon : <Icon type={icon}/>
                    }
                    {
                      <p>
                        {text}
                      </p>
                    }
                  </div>
                }
              </Badge>
            </div>;
          return (
            <RcTabs.TabPane tab={tabContent} {...others} key={child.key}>
              {
                children
              }
            </RcTabs.TabPane>
          );
        })
      }
    </RcTabs>
  )
};

TabBar.propTypes = {
  animation: PropTypes.bool,
  onChange: PropTypes.func,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  transitionName: PropTypes.object
};

TabBar.defaultProps = {
  animation: true,
  transitionName: {
    backward: 'ryt-am-slide-horizontal-backward',
    forward: 'ryt-am-slide-horizontal-forward'
  }
};

TabBar = PureRenderHoc(TabBar);


const Panel = (props) => {
  const {children, ...others} = props;
  return (
    <div {...others} >
      {children}
    </div>
  )
};

Panel.propTypes = {
  key: PropTypes.string.isRequired,
  tab: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  text: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  content: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  hasBadge: PropTypes.bool,
  badgeType: PropTypes.string,
  badgeText: PropTypes.oneOfType[PropTypes.number, PropTypes.string],
  badgeMaxNum: PropTypes.number
};

Panel.defaultProps = {
  disabled: false,
  hasBadge: false
};


TabBar.Panel = PureRenderHoc(Panel);
export default TabBar;

