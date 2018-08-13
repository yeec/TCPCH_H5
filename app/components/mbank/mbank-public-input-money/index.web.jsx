import React from 'react';
import PureRenderHoc from '../../../util/hoc/index';
import Icon from '../../Base/icon/index.web.jsx';
import Common from '../../../util/common';
import API from '../../../constants/api'
import $native from '../../../native/native'
import './style/index.web';
import $ from "jquery";

class MbankPublicInputMoney extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			InputId: this.props.inputid,
			clearState: false,
			value: this.props.value,
			showAllMoney: this.props.showAllMoney,
			keyKbHide: ""
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			this.setState({
				value: nextProps.value,
				clearState: nextProps.value != '' ? true : false
			});
		}
	}

	//限额说明
	jumpLimitTip() {
		let alertDict = {
			title: "限额说明",
			msg: "单日单笔限额50万元，单日累计交易限额100万元。",
			success_text: "确认"
		}
		Common.showAppDialogAlert(alertDict);
		// hashHistory.push('/MbankTransferOut')
	}
	// inputChange(e) {
	// 	let that = this;
	// 	this.setState({
	// 		value: e.target.value
	// 	})
	// 	that.props.finalval(e.target.value);
		// let that = this;
		// let valdata = document.getElementById(vals).value;
		// if(!Common.judgeEmpty(valdata)){
		// 	that.setState({
		// 		clearState: true
		// 	})
		// }else{
		// 	that.setState({
		// 		clearState: false
		// 	})
		// }
		// that.props.finalval(valdata);

		// that.setState({
		// 	clearState: Common.judgeEmpty(valdata) ? false : true
		// })
		// let value1 = valdata.replace(/[^0-9+.]/g, '');
		// let valuex = value1.split(".").length < 2 ? value1.substring(0, 12) : value1;
		// let valuey = valuex.split(".").length < 2 ? valuex : valuex.split(".")[0] + '.' + valuex.split(".")[1].substring(0, 2);
		// let value2 = valuey.replace(/\.{2,}/g, '.').replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		// let value3 = value2.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
		// document.getElementById(vals).value = value3;
	// }

	// inputBlur(vals) {
	// 	let that = this;
	// 	let valdata = document.getElementById(vals).value;
	// 	// if (valdata === "") {
	// 	// 	that.props.finalval("");
	// 	// } else {
	// 	// 	let valarr = valdata.split(".");
	// 	// 	if (valarr.length < 2) {
	// 	// 		valdata = Number(valdata).toString();
	// 	// 		valdata = (valdata ? valdata : '0') + ".00";
	// 	// 	} else {
	// 	// 		valdata = (valarr[0].replace(/\b(0+)/gi, "") == '' ? '0' : valarr[0].replace(/\b(0+)/gi, "")) + '.' + valdata.substring(valdata.indexOf(".") + 1, valdata.length);
	// 	// 		if (valdata.substring(valdata.indexOf(".") + 1, valdata.length).length != 2) {
	// 	// 			valdata = valarr[1].length == 0 ? valdata + "00" : (valarr[1].length == 1 ? valdata + "0" : valdata)
	// 	// 		}
	// 	// 	}
	// 	// }
	// 	// document.getElementById(vals).value = valdata;
	// 	that.props.finalval(valdata);
	// }

      // 调用客户端键盘接口
    //  "amount":金额键盘，"num":纯数字键盘，"pwd":数字字母组合键盘，"idcard"身份证键盘，"tradePsw":交易密码键盘
	showKeyBoard1 = newId => {
		this.cancelKbGb(newId);
		this.setState({
			value:""
		})
		let that = this;
		//展示光标
		$("#" + newId).show();
		//输入框上移
		Common.pageMoveShow(this.props.pageMove);
		$native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
			type: "amount",
			//关闭键盘回调函数，并传入关闭的光标的Id
			cancel: that.cancelKb.bind(this, newId),
			success: (res) => {
				let jsons = JSON.parse(res);
				this.setState({
					value: jsons.text
				});

				this.props.finalval(Common.getFloatStr(jsons.text));
				showKeyBoard1();
			}
		});
		$("#" + newId).show();
	}

	cancelKbGb = val => {
        let kbId=this.state.keyKbHide
        if(kbId){
          $("#" + kbId).hide();
          this.setState({
            keyKbHide:val
         })
        }else{
          this.setState({
            keyKbHide:val
         })
        }
    };
	
	cancelKb = val => {
		//隐藏光标
		$("#" + val).hide();
		//还原上移
		Common.pageMoveHide();
	  };

	cleanInputVal(vals) {
		this.setState({
			value: '',
			clearState: false
		})
		this.props.finalval("");
	}

	/**
	 * 注意：input
	 * 
	 * 若设置了defaltValue，为不可控组件（value值就是用户输入的内容，React完全不管理输入）
	 * 
	 * 若设置value，为可控组件，---必须设置onChange---！（由React管理的value，value中为this.state.value,由onChange进行管理）
	 * 
	 */

	showMoney(){
		this.setState({
			value: this.props.showAllMoney
		});
		this.props.finalval(this.state.value);
	}

	render() {

		return (
			<div className="mbank-public-input-money-box mbank-public-input-money-box-lg">
				<div className="mbank-public-input-money">
					<div>
						<span className="mbank-public-input-money-title">{this.props.inputName}</span>
						{this.props.limitFlag ? <div className="mbank-public-input-money-link" onClick={this.jumpLimitTip.bind(this)}><span>限额说明</span><Icon size="xs" name="tips" /></div> : null}
					</div>
					<div>
						<span>￥</span>
						<input
							type="amount"
							id={this.state.InputId} 
							placeholder={this.props.placeholder}
							value={this.state.value}
							editable={false}
							readOnly="readOnly"
							onClick={this.showKeyBoard1.bind(this,"keyboardMoney")}
							// onChange={this.inputChange.bind(this)}
						/>
						{
							this.state.clearState ?
								<div className="mbank-public-input-money-delete" onClick={this.cleanInputVal.bind(this, this.state.InputId)}>
									<Icon size="xs" name="clear" />
								</div>
								:
								null
						}
						{/* {
							this.props.showButtonFlag ?
							<div className="mbank-public-box-all" onClick={this.showMoney.bind(this)}>全部</div>
							:
							null
						} */}

					</div>
				</div>
			</div>
		);
	}
}
MbankPublicInputMoney.propTypes = {
	inputid: React.PropTypes.string,
	finalval: React.PropTypes.any,
	inputName: React.PropTypes.string,
	limitFlag: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	value: React.PropTypes.any
};

MbankPublicInputMoney.defaultProps = {
	inputid: "",
	finalval: "",
	inputName: "转账金额(元)",
	limitFlag: true,
	placeholder: "请输入转账金额",
	value: '',
	showButtonFlag:false
};
export default PureRenderHoc(MbankPublicInputMoney);