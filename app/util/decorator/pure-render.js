import shallowEqual from 'fbjs/lib/shallowEqual';

const shouldComponentUpdate = function (nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}

const pureRender = (comp) => {
  comp.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return comp;
};

export default pureRender;
