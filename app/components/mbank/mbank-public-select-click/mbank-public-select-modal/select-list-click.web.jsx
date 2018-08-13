import React from "react";
import ReactDom from "react-dom";
import Tappable from "react-tappable";
import Modal from "./modal.web";
import Common from "../../../../util/common.jsx";

/**
 * options {
 *  items:[],
 *  cancelIndex:number,
 *  titleText:string,
 * }
 *
 */
const transferPaymentAccount = (...args) => {
  const options = args[0];
  const callback = args[1];
  if (typeof options === "function" || !options.items) return;

  let div = document.createElement("div");
  // div.style.willChange = 'transform';
  div.id = "mbankModal";
  document.body.appendChild(div);

  const actionSheetWrapCls = "mbank-modal-action-sheet-wrap";

  const tapHandle = (index, value, label) => () => {
    if (callback && typeof callback === "function") {
      callback(index, value, label);
      // console.log(index, value, label);
    }
  };

  const content = options => {
    let { items, close,closeText, cancelIndex, onChange } = options;
    let list = items.map(function(item, i) {
      return JSON.stringify(item);
    });
    return (
      <div className="mbank-modal-btn-group-vertical">
        <div className="mbank-modal-btn-box">
          <div className="mbank-public-pop-list-click-list">
            {list.map((item, index) => {
              let itemobj = JSON.parse(item);
              let cardnumnew = Common.setAccountNum(itemobj.acNo);
              let ontapflag;
              if (itemobj.usable === "0") {
                ontapflag = false;
              } else {
                ontapflag = true;
              }
              let ifchecked = "";
              if (itemobj.now === "1") {
                ifchecked = "selected";
              }

              if (index === cancelIndex) {
                return null;
              } else {
                return (
                  <Tappable
                    key={`action-sheet-btn-${index}`}
                    className="mbank-modal-btn"
                    onTap={
                      ontapflag
                        ? tapHandle(index, itemobj.value, itemobj.label)
                        : null
                    }
                  >
                    <div className="mbank-public-pop-list-click-list">
                      <div className={ifchecked}>{itemobj.label}</div>
                    </div>
                  </Tappable>
                );
              }
            })}
          </div>
        </div>
        <div className="mbank-public-pop-list-click-close">
          <Tappable key="action-sheet-btn-cancel" className="" onTap={close}>
            {closeText}
          </Tappable>
        </div>

        {cancelIndex ? (
          <div className="mbank-ui-1px-t" style={{ height: 8 }} />
        ) : null}
      </div>
    );
  };

  ReactDom.render(
    <Modal
      visible
      type="action-sheet"
      wrapClassName={actionSheetWrapCls}
      maskTransitionName="mbank-am-fade"
      footer={content(options)}
    />,
    document.getElementById("mbankModal")
  );
};

export default transferPaymentAccount;
