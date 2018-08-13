import React from 'react';
import ReactDom from 'react-dom';
import Tappable from 'react-tappable';
import Modal from './modal.web';
import MbankAccountIcon from './../../mbank-public-icon/index.web.jsx';
import Icon from '../../../Base/icon/index.web.jsx';



/**
 * options {
 *  items:[],
 *  cancelIndex:number,
 *  titleText:string,
 * }
 *
 */

const TransferType = (...args) => {
  const options = args[0];
  const callback = args[1];
  if(typeof options === 'function' || !options.items)
    return;

  let div = document.createElement('div');
  // div.style.willChange = 'transform';
  div.id = 'mbankModal';
  document.body.appendChild(div);

  const actionSheetWrapCls = 'mbank-modal-action-sheet-wrap';
  
  const tapHandle = (index , fas) => ()=> {
    if(fas!="a"){
      if (callback && typeof callback === 'function') {
        callback(index);
      }

    }
    
  };
 
  
  const content = (options) => {
    let {items,cancelIndex,titleText,close,} = options;
    
    
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
            onTap={close}
          >
              <Icon size="sm" name={"close"}/>
            </Tappable>
            <div className="mbank-modal-title-text">{titleText}</div>
          </div>
          : null
        }
        {
          items.map((item,index) => {
            let itemobj = JSON.parse(item);
            let ifusable = {display: "none"};
            let fass = {}
            let rytPopListClass = "ryt-list-content ryt-pop-list";
            let ontapflag;
            if(itemobj.fas == "a"){
              fass = {color:"#d5d3d3"}
            }
            if(itemobj.usable === "0"){
              rytPopListClass = "ryt-list-content ryt-pop-list ryt-pop-list-disabled";
              ifusable = {display: "block"};
              ontapflag= false;
            }else{
              ontapflag= true;
            }
            let ifchecked = {display: "none"};
            if(itemobj.currents === "1"){
              ifchecked = {display: "block"};
            }

            if (index === cancelIndex){
              return null;
            }else{
              return (
                <Tappable
                  key={`action-sheet-btn-${index}`}
                  className="mbank-modal-btn"
                  onTap={ontapflag ? tapHandle(index,itemobj.fas) : null}
                >
                <div className="mbank-public-pop-list">
                  <div  className="mbank-public-pop-list-body">
                    <div style={fass} className="mbank-public-pop-list-item mbank-public-pop-list-item-middle">
                      <div className="mbank-public-pop-list-line">
                        <div className="mbank-public-pop-list-content">
                        <div><em  style={fass} >{itemobj.titles}</em></div>
                        <div className="mbank-public-pop-list-brief"><span  style={fass}>{itemobj.contents}</span></div>
                        </div>
                        <div className="mbank-public-pop-list-extra">
                        <div style={ifusable}><div className="ryt-button ryt-button-ghost ryt-button-small ryt-button-inline"><span>开通</span></div></div>
                          <div style={ifchecked}><MbankAccountIcon size="sm" name={"xuanzhe"}/></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Tappable>
              );
            }
          })
        }
        {
          cancelIndex ?<div className="ryt-ui-1px-t" style={{height:8}}></div>:null
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
  ),document.getElementById('mbankModal'));

};


export default TransferType;
