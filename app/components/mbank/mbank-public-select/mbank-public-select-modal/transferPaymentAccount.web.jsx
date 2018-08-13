import React from 'react';
import ReactDom from 'react-dom';
import Tappable from 'react-tappable';
import Modal from './modal.web';
import Common from "../../../../util/common.jsx"
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

const transferPaymentAccount = (...args) => {
	const options = args[0];
	const callback = args[1];
	if (typeof options === 'function' || !options.items)
		return;

	let div = document.createElement('div');
	// div.style.willChange = 'transform';
	div.id = 'mbankModal';
	document.body.appendChild(div);

	const actionSheetWrapCls = 'mbank-modal-action-sheet-wrap';

	const tapHandle = (index) => () => {
		// close();
		if (callback && typeof callback === 'function') {
			callback(index);
		}
	};

	const content = (options) => {
		let { items,customerNames, cancelIndex, titleText ,close} = options;
		return (
			<div className="mbank-modal-btn-group-vertical">
				{
					titleText ?
						<div className="mbank-modal-titlebox">
							<Tappable
								key='action-sheet-btn-cancel'
								className="mbank-modal-title-arrow"
								onTap={close}
							>
								<Icon size="sm" name={"close"} />
							</Tappable>
							<div className="mbank-modal-title-text">{titleText}</div>
						</div>
						: null
				}
				<div className="mbank-modal-btn-box">
				{
					items.map((item, index) => {
						let itemobj = JSON.parse(item);
						let cardnumnew = Common.setAccountNum2(itemobj.acNo,true);
						let ontapflag;
						if (itemobj.usable === "0") {
							ontapflag = false;
						} else {
							ontapflag = true;
						}
						let ifchecked = { display: "none" };
						if (itemobj.now === "1") {
							ifchecked = { display: "block" };
						}

						if (index === cancelIndex) {
							return null;
						} else {
							return (
								<Tappable
									key={`action-sheet-btn-${index}`}
									className="mbank-modal-btn"
									onTap={ontapflag ? tapHandle(index) : null}
								>
									<div className="mbank-public-pop-list">
										<div className="mbank-public-pop-list-body">
											<div className="mbank-public-pop-list-item mbank-public-pop-list-item-middle">
												<div className="mbank-public-pop-list-line">
													<div className="mbank-transfer-list-fukuan-item-icon">
														<MbankAccountIcon size="l" name="logo-313684093748" />
													</div>
													<div className="mbank-public-pop-list-content">
														<div>{cardnumnew}({itemobj.cusName || customerNames})</div>
														<div className="mbank-public-pop-list-balance"><span>可用余额</span><div className="balance">￥{itemobj.availBal} <span>元</span></div></div>
													</div>
													<div className="mbank-public-pop-list-extra">
														<div style={ifchecked}><MbankAccountIcon size="sm" name={"xuanzhe"} /></div>
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
				</div>
				{
					cancelIndex ? <div className="mbank-ui-1px-t" style={{ height: 8 }}></div> : null
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
	), document.getElementById('mbankModal'));

};


export default transferPaymentAccount;
