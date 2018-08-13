要实现toast关闭时的动画 , 必须得重写rc-notification的destroy方法 => 
`javascript
    div.display = 'none';
    setTimeout(()=>{ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);},200)
`

其中这个200是跟据fade动画的duration来的;
另外rc-notification有文档上为暴露的props:

`javascript
    transitionName: PropTypes.string,
    animation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
`

最后加载的动画为`${animation}-${transitionName}`;
可以只设置transitionName,动画则为`${transitionName}`;

具体的请参考ReactCSSTransitionGroup
