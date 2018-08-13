import React from 'react';
import API from './../../../../constants/api';
import PureRenderHoc from '../../../../util/hoc/index';
import Icon from './../../mbank-public-icon/index.web.jsx';
import Common from "../../../../util/common.jsx"
import './../style/index.web';

class MbankPublicListSelectPeople extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info:this.props.info,
			accountName: this.props.info.accName || this.props.info.pname,
			bankName: this.props.info.pmsBankName==""?this.props.info.unionBankName:this.props.info.pmsBankName,
			mobileNo: this.props.info.mobile,
			accountNo: this.props.info.accNo || this.props.info.paccount,
			payBookId: this.props.info.payBookId || '',
			accountType: this.props.info.accType || '',
			pmsBankNo: this.props.info.pmsBankNo==""?this.props.info.unionBankNo:this.props.info.pmsBankNo
		}
	}
	componentWillReceiveProps(nextProps) {
		let that = this;
		that.setState({
			bankName: nextProps.info.pmsBankName || this.props.info.pbank
		})
	}
	// 回显收款人的信息
	clickHandle() {
		let params = {
			info:this.props.info,
            mobile:this.props.info.mobile,
            pmsBankNo: this.props.info.pmsBankNo==""?this.props.info.unionBankNo:this.props.info.pmsBankNo,//|| this.props.info.pname,
			accountName: this.props.info.accName || this.props.info.pname,
			bankName: this.props.info.pmsBankName==""?this.props.info.unionBankName:this.props.info.pmsBankName,
			accountNo: this.props.info.accNo || this.props.info.paccount
		}
		this.props.onclick(params);
	}

	// 收款人列表的转账点击
	transferHandleClick = (val) => {
		Common.addSessionData(API.SESSION_TRANSFER_USER_DATA, JSON.stringify(this.props.info));
		this.props.transferFun();
	}

	// 收款人列表的编辑事件
	editHandleClick = (val) => {
		Common.addSessionData(API.SESSION_TRANSFER_USER_EDIT_DATA, JSON.stringify(this.state));
		this.props.editFun();
	}

	// 收款人列表的删除点击事件
	deleteHandleClick() {
		this.props.deleteFun(this.props.info.payBookId);
	}

	render() {
		// 银行名称对应图标
		let bankIcon = 'bank';
		let pmsBankNo2 = this.props.info.pmsBankNo==""?this.props.info.unionBankNo:this.props.info.pmsBankNo;
		let bankNum = pmsBankNo2 == '313684093748' ? '313684093748' : this.state.info.pmsBankNo.substring(0,3);
		let arr = [313684093748,102,103,104,105,308,307,301,302,309,303,305,403];
		for(let i=0;i<arr.length;i++){
            let checkNum = arr[i];

			if(Number(bankNum) === checkNum){
				bankIcon = 'logo-' + bankNum;
				break;
			}
        }
		return (
			<div className="mbank-public-list-body">
				<div className="mbank-public-list-item mbank-public-list-middle " onClick={this.props.clickflag ? this.clickHandle.bind(this) : null}>
					<div className="mbank-public-list-line">
						<div className="mbank-public-list-title">
							<Icon size="xl" name={bankIcon} />
						</div>
						<div className="mbank-public-list-content">
							<div className="mbank-public-list-name">{this.state.accountName}</div>
							<div className="mbank-public-list-brief">{this.state.bankName}</div>
							<div className="mbank-public-list-brief">{Common.setAccountNumForSpace(this.state.accountNo)}</div>
						</div>
						{!this.props.clickflag ?
                            <div className="mbank-public-list-button">
							    <div onClick={this.transferHandleClick.bind(this)} className="button"><Icon size="sm" name={"shoukuanren-zhuanzhang"} />
								    <p>转账</p>
							    </div>
							    <div onClick={this.editHandleClick.bind(this)} className="button"><Icon size="sm" name={"shoukuanren-edit"} />
								    <p>编辑</p>
							    </div>
							    <div onClick={this.deleteHandleClick.bind(this)} className="button"><Icon size="sm" name={"shoukuanren-delete"} />
								    <p>删除</p>
							    </div>
						</div> :null}

					</div>
				</div>
			</div>
		);
	}
}
MbankPublicListSelectPeople.propTypes = {
	info: React.PropTypes.any,
	changeclick: React.PropTypes.any,
	clickflag: React.PropTypes.any,
	onclick: React.PropTypes.any,
	deleteFun: React.PropTypes.any,
	transferFun: React.PropTypes.any,
	editFun: React.PropTypes.any,
};

MbankPublicListSelectPeople.defaultProps = {
	info: {},
	changeclick: null,
	clickflag: false, //MbankTransferIn-true/transfer-userQuery-false
	onclick: "",
	deleteFun: "",
	transferFun: "",
	editFun: ""
};

export default PureRenderHoc(MbankPublicListSelectPeople);
