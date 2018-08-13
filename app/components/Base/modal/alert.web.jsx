import React from 'react';
import ReactDom from 'react-dom';
import Tappable from 'react-tappable';
import Modal from './modal.web';

const Alert = (...args) => {
  const contentInfo = args[0];
  const actions = args[1] || [{text:'取消'},{text:'确定'}];

  if (JSON.stringify(contentInfo) == "{}") return;

  let div = document.createElement('div');
  div.id = 'mbankModal';
  document.body.appendChild(div);

  const btnGroupCls = `ryt-modal-btn-group-${actions.length ==1?'vertical':'horizon'}`;

  // const close = () => {
  //   ReactDom.unmountComponentAtNode(div);
  //   div.parentNode.removeChild(div);
  //   div = null;
  // };

  const tapHandler = (func) => {
    return function (e) {
      e.preventDefault();
      // close();
      func && (func(e));
    }
  };

  const footer = (
    <div className={btnGroupCls}>
      {
        actions.map((action,index) => {
          return (
            <Tappable
              key={`alert-btn-${index}`}
              onTap={tapHandler(action.onTap)}
              className="ryt-modal-btn"
              component="button">
              {action.text}
            </Tappable>
          );
        })
      }
    </div>
  );
  // iconState : '0'-失败 '1'-成功 不传该字段不显示图标状态
  // const iconState = contentInfo.iconState ? (contentInfo.iconState == '0' ? 'error':'success') : false;
  // const iconCls = `ryt-icon ryt-icon-lg mbank-icon-undefined mbank-icon-${iconState}`;
  
  ReactDom.render((
    <Modal
      visible
      type="alert"
      transitionName="ryt-am-zoom"
      maskTransitionName="ryt-am-fade"
      footer={footer}
    >
      <div className="ryt-modal-alert-box">
        <div className="ryt-modal-alert-box-title">{contentInfo.title}</div>
        {/*
          iconState ? 
          <div className="ryt-modal-alert-box-middle">
            <i className={iconCls}></i><span>{contentInfo.iconTitle}</span>
          </div>:null
        */}
        <div className="ryt-modal-alert-box-content">{contentInfo.msg}</div>
      </div>
    </Modal>
  ),document.getElementById('mbankModal'));

};

export default Alert;
