import React from 'react';
import ReactDom from 'react-dom';
import Tappable from 'react-tappable';
import Modal from './modal.web';
import MbankTransferListFK from './mbank-transfer-list-fukuan/index.web.jsx';
import Common from "../../../../util/common.jsx";
import Icon from '../../../Base/icon/index.web.jsx';



/**
 * options {
 *  items:[],
 *  cancelIndex:number,
 *  titleText:string,
 * }
 *
 */

const AccountType = (...args) => {
  Common.removeSessionData(API.SESSION_SAVE_CURRENTKEYDATA);
  const options = args[0];
  const callback = args[1];
  if(typeof options === 'function' || !options.items)
    return;

  let div = document.createElement('div');
  // div.style.willChange = 'transform';
  document.body.appendChild(div);

  const actionSheetWrapCls = 'ryt-modal-action-sheet-wrap';

  const close = () => {
    Common.removeSessionData(API.SESSION_SAVE_CURRENTKEYDATA);
    ReactDom.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  };

  const close2 = () => () => {
    Common.removeSessionData(API.SESSION_SAVE_CURRENTKEYDATA);
    ReactDom.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  };

  const tapHandle = () => ()=> {
    let index="";
    if(Common.getSessionData(API.SESSION_SAVE_CURRENTKEYDATA)){
      index = Common.getSessionData(API.SESSION_SAVE_CURRENTKEYDATA);
    }else{
      index = "0";
    }
    close();
    if (callback && index && typeof callback === 'function') {
      callback(index-0);
    }
  };

  const changeKey = (index) => {
    // console.log(index);
    Common.addSessionData(API.SESSION_SAVE_CURRENTKEYDATA,index);
    // console.log(Common.getSessionData(API.SESSION_SAVE_CURRENTKEYDATA));
  };

  const content = (options) => {
    let {items,cancelIndex,titleText} = options;
    return (
      <div
        className="ryt-modal-btn-group-vertical"
      >
        {
          titleText ? 
          <div className="ryt-modal-titlebox">
            <Tappable
            key='action-sheet-btn-cancel'
            className="ryt-modal-title-arrow"
            onTap={close2()}
          >
              <Icon size="xs" name="close"/>
            </Tappable>
            <div className="ryt-modal-title-text">{titleText}</div>
            <Tappable
                  key='action-sheet-btn-check'
                  className="ryt-modal-title-checkbox"
                  onTap={tapHandle()}
                >
              <div className="ryt-modal-title-check">确定</div>
            </Tappable>
          </div>
          : null
        }
        {
          items ?
            <MbankTransferListFK items={items} changekey={(index) => {changeKey(index)}} radioname="transfer-list-fukuanradio"/>
          : null
        }
      </div>
    );

  };


  ReactDom.render((
    <Modal
      visible
      type="action-sheet"
      wrapClassName={actionSheetWrapCls}
      maskTransitionName="ryt-am-fade"
      footer={content(options)}
    />
  ),div);

};

export default AccountType;
