import React from 'react';
import ReactDom from 'react-dom';
import Tappable from 'react-tappable';
import Modal from './modal.web';
import Common from "../../../../util/common.jsx";
import WingBlank from '../../../Base/wing-blank/index.web.jsx';
import Button from '../../../Base/button/index.web.jsx';
import AuthItem from '../../../Base/auth-input/index.web.jsx';
import WhiteSpace from '../../../Base/white-space/index.web.jsx';
import Icon from '../../../Base/icon/index.web.jsx';




/**
 * options {
 *  items:[],
 *  cancelIndex:number,
 *  titleText:string,
 * }
 *
 */

const SmsApprove = (...args) => {
  const options = args[0];
  const callback = args[1];
  if(typeof options === 'function')
    return;

  let div = document.createElement('div');
  // div.style.willChange = 'transform';
  document.body.appendChild(div);

  const actionSheetWrapCls = 'mbank-modal-action-sheet-wrap';

  const close = () => {
    Common.removeSessionData(API.SESSION_SAVE_AUTHCODEDATA);
    ReactDom.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  };

  const tapHandle =() => ()=> {
    close();
  };

  const setAuthinputval = (vals) => {
    // console.log(vals);
    Common.addSessionData(API.SESSION_SAVE_AUTHCODEDATA,vals);
    console.log(Common.getSessionData(API.SESSION_SAVE_AUTHCODEDATA));

  };

  const tapHandle2 = () =>()=> {
    if (callback && typeof callback === 'function') {
      callback(Common.getSessionData(API.SESSION_SAVE_AUTHCODEDATA));
    }
    close();

    // Common.removeSessionData(API.SESSION_SAVE_AUTHCODEDATA);
  };

  const content = (options) => {
    let {phoneNum,titleText} = options;
    return (
      <div
        className="mbank-modal-btn-group-vertical"
      >
        {
          titleText ? 
          <div className="mbank-modal-titlebox">
            <Tappable
            key='action-sheet-btn-cancel'
            className="mbank-modal-title-arrow"
            onTap={tapHandle()}
          >
              <Icon size="sm" name="svg-arrow-left"/>
            </Tappable>
            <div className="mbank-modal-title-text">{titleText}</div>
          </div>
          : null
        }
        {
          phoneNum ? 
          <div>
            <WhiteSpace size="lg"/>
            <AuthItem lefttitle={false} iddatas={"autoinput"} inputtype={"authcode"} finalval={(vals) => {setAuthinputval(vals)}} maxlen={"6"}/>
            <WhiteSpace size="lg"/>
            <WingBlank size="md">
              <div className="mbank-modal-tip">已向您尾号为{phoneNum}的手机号发送验证码</div>
            </WingBlank>
            <WhiteSpace size="lg"/>
            <WingBlank size="md">
              <Tappable
              key='action-sheet-btn-cancel'
              onTap={tapHandle2()}
            >
                <Button type="primary" size="default">确认</Button>
              </Tappable>
            </WingBlank>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
          </div>
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
      maskTransitionName="mbank-am-fade"
      footer={content(options)}
    />
  ),div);

};


export default SmsApprove;
