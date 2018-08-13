import React from 'react'
import './style/index.less'

class Loading extends React.Component{
	static displayName = 'Loading'
	loadingScroll(){
		// console.log("测试");
	}
	render() {
		return (
			<div id="ryt-page-loading" onTouchStart={this.loadingScroll.bind(this)} className="ryt-page-loading"><div className="ryt-page-loading-gif"></div></div>
		);
	}
}
export default Loading
