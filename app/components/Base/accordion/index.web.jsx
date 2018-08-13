/**
 * component: accordion
 * description: 手风琴菜单
 * author: ray
 * version: v 1.0.0
 * date:2016-09-01
 */
import React , {PropTypes} from 'react';
import RcCollapse from 'rc-collapse';
import PureRenderHOC from '../../../util/hoc/index';
import './style/index.web';
const prefixCls = 'ryt-accordion';

let Accordion = (props) => {
  let {
    autoClose,
    children,
    ...ohters
  } = props;

  if (!children.length) {
    children = [children]
  }

  return (
    <RcCollapse {...ohters} prefixCls={prefixCls} accordion={autoClose}>
      {
        children.map((child) => {
          const props = child.props;
          // React.cloneElement(RcCollapse.Panel, {...props,key:child.key})
          return (
            <RcCollapse.Panel {...props} key={child.key}/>
          )
        })
      }
    </RcCollapse>
  );
};

Accordion.propTypes = {
  autoClose: PropTypes.bool,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  onChange: PropTypes.func
};

Accordion.defaultProps = {
  autoClose: true
};

const Panel = (props) => {
  const {children,...others} = props;
  return (
    <div {...others} >
      {children}
    </div>
  )
};

Panel.propTypes = {
  header: PropTypes.any
};


Accordion = PureRenderHOC(Accordion);
Accordion.Panel = PureRenderHOC(Panel);

export default Accordion;