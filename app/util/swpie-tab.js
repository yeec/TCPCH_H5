import React, {PureComponent} from 'react';

const prefixCls = 'apollo-tabs';

const SwipeTab = (Comp) => {
  return class SwipeTab extends PureComponent {

    static defaultProps = {
      onChange: function () {

      }
    }

    constructor(props) {
      super(props);
      this.panels = [];
      React.Children.forEach(props.children, (child, index) => {
        this.panels[index] = {
          index,
          key: child.key
        }
      });
      this.state = {
        activeKey: props.activeKey || props.defaultActiveKey || this.panels[0].key
      }
    }

    componentDidMount() {
      const node = this.refs[prefixCls].getDOMNode();
      const hammer = new Hammer(node);
      hammer.on('swipeleft', (res) => {
        const key = this.state.activeKey;
        let index = 0;
        for (let i = 0;i<this.panels.length;i++) {
          if (this.panels[i].key === key) {
            index = i;
            break;
          }
        }
        if (++index < this.panels.length) {
          this.setState(
            {
              activeKey: this.panels[index].key
            }
          )
        }
      });

      hammer.on('swiperight', (res) => {
        const key = this.state.activeKey;
        let index = 0;
        for (let i = 0;i<this.panels.length;i++) {
          if (this.panels[i].key === key) {
            index = i;
            break;
          }
        }
        if (--index >=0) {
          this.setState(
            {
              activeKey: this.panels[index].key
            }
          )
        }
      })
    }


    onChangeHandle = (key) => {
      this.setState({
        activeKey: key
      });
      this.props.onChange(key);
    }

    render() {
      const {
        activeKey,
        children,
        onChange,
        ...others
      } = this.props;
      return (
        <Comp
          ref={prefixCls}
          activeKey={this.state.activeKey}
          onChange={this.onChangeHandle}
          {...others}
        >
          {children}
        </Comp>
      )
    }
  }
}

export default SwipeTab;