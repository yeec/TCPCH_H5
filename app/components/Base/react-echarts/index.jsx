import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import './style/index.less';
import theme from './theme';
// import echarts from 'echarts'

echarts.registerTheme('green', theme);

export default class ReactEcharts extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,
    onReady: React.PropTypes.func,
    showLoading: React.PropTypes.bool,
    events: React.PropTypes.object,
    option: React.PropTypes.object.isRequired,
  }


  static defaultProps = {
    theme: 'green'
  }


  componentDidMount() {
    const chart = this.renderEcharts();
    const events = this.props.events || {};
    for (const event in events) {
      if (events.hasOwnProperty(event)) {
        chart.on(event, (params) => {
          events[event](params, chart);
        });
      }
    }
    if (this.props.onReady && typeof this.props.onReady === 'function') {
      this.props.onReady(chart);
    }
  }

  renderEcharts = () => {

    const chart = echarts.init(this.refs.reactChart, this.props.theme);
    chart.setOption(this.props.option);
    if (this.props.showLoading) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }
    return chart;
  }


  render() {
    const style = this.props.style || { height: 300, width: '100%' };
    return (
      <div
        ref="reactChart"
        style={ style }
        className={this.props.className}
      >
      </div>
    );
  }
}
