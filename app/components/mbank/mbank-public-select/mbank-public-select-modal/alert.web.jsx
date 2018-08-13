import React from 'react';
import ReactDom from 'react-dom';
import Tappable from 'react-tappable';
import Modal from './modal.web';

const Alert = (...args) => {
  const content = args[0];
  const actions = args[1] || [{text:'取消'},{text:'确定'}];

  if (!content) return;

  let div = document.createElement('div');
  div.id = 'mbankModal';
  document.body.appendChild(div);

  const btnGroupCls = `ryt-modal-btn-group-${actions.length >2?'vertical':'horizon'}`;

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

  ReactDom.render((
    <Modal
      visible
      type="alert"
      transitionName="ryt-am-zoom"
      maskTransitionName="ryt-am-fade"
      footer={footer}
    >
      <div style={{overflow:'hidden'}}>
        {content}
      </div>
    </Modal>
  ),document.getElementById('mbankModal'));

};

export default Alert;
