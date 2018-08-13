import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ContextDecorator from '../../../../util/decorator/context-decorator';

//API数据接口
import API from './../../../../constants/api';
//公共方法
import $Fetch from './../../../../fetch/fetch';
import $native from './../../../../native/native';
import Common from "../../../../util/common.jsx";
import $ from 'jquery';
//基础组件
import List from '../../../../components/Base/list/index.web.js';
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import Input from '../../../../components/Base/input-list/index.web.jsx';
import SwitchLis from '../../../../components/Base/switchLst/index.web.jsx';
import DatePickerDemo from '../../../../components/Base/date-picker/index.web';
import ListWord from '../../../../components/Base/list-word/index.web.js';
import Tips from '../../../../components/mbank/mbank-pubilc-tips/index.web.jsx';
import Cell from '../../../../../app/components/Base/cell/index.web.js';
//样式引入
import '../../../../components/mbank/mbank-public-query/style/index.less';
export default class AccountLockCard extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			list: [],
			//卡号
			Detail: "",
			//交易标志 查询 开关
			reuestFlag: "",
			//境内外标志
			foreignFlag: "",
			//交易类型 POS ATM
			transType: "",
			//限制状态 开启 关闭 限制
			limitStatus: "",
			//限制时间
			limitTime: "",
			//限制金额
			limitAmount: "",
			// 开关状态
			//一键锁卡状态
			// alockcard: false,
			//更多锁卡交易
			alockcard1: false,
			//境内POS
			switch1Checked: false,
			//境内ATM
			switch1Checked1: false,
			//境外POS
			switch1Checked3: false,
			//境外ATM
			switch1Checked4: false,
			//上送时间
			limitTime1: "",
			limitTime2: "",
			limitTime3: "",
			limitTime4: "",
			// 限制金额
			//境内POS限制金额
			limitAmount1: '',
			//境内ATM限制金额
			limitAmount2: '',
			//境外POS限制金额
			limitAmount3: '',
			//境外ATM限制金额
			limitAmount4: '',
			//境内POS开始日期
			starDate1: "00:00",
			//境内POS结束日期
			endDate1: "00:00",
			//境内ATM开始日期
			starDate2: "00:00",
			//境内ATM结束日期
			endDate2: "00:00",
			//境外POS开始日期
			starDate3: "00:00",
			//境外POS结束日期
			endDate3: "00:00",
			//境外ATM开始日期
			starDate4: "00:00",
			//境外ATM结束日期
			endDate4: "00:00",
			//点击设置时候的标志位
			fagel: "",
			keyKbHide: "",
			limitAmount1Size: "",
			limitAmount2Size: "",
			limitAmount3Size: "",
			limitAmount4Size: ""
		}
		// 性能优化（当数据重复时不做DOM渲染）
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

	}


	// 返回页面设置
	goBackPage() {
		$native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
		Common.setUrl('account-detail/index.html');
	}
	// 初始化设置
	componentDidMount() {

		let that = this;
		let listmap = "";
		let limitStatus1 = "";
		let limitStatus2 = "";
		let limitStatus3 = "";
		let limitStatus4 = "";
		// 调取客户TopBar功能并设置标题及返回按钮
		$native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
			title: '一键解/锁卡',
			leftButton: {
				exist: 'true',
				closeFlag: 'false',
				success: this.goBackPage
			}
		});

		// 接收卡号
		let sessionData = JSON.parse(Common.getSessionData(API.SESSION_ACCOUNT_DATA));
		//给卡号复制
		this.setState({
			Detail: sessionData.accInfoMap.acNo
		})

		//查询锁卡状态
		$Fetch(API.API_SET_ACCOUNT_LOCKING, {
			//默认固定上送报文
			reqHead: {
				//场景编码
				sceneCode: "AC03",
				//步骤编码(根据相应步骤填写字段（1,2,3,4）)
				stepCode: "2",
				//交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
				tradeType: "1",
				//交易标识 1-主，2-副
				flag: "1",
				//服务接口版本号 1.0.0
				serviceVersion: "1.0.0"
			},
			// 交易上送报文
			data: {
				//交易手里标志  0-查询   1开关交易
				reuestFlag: "0",
				//境内外标志 0-境内 1-境外 2-全部
				foreignFlag: "2",
				//卡号
				accountNo: sessionData.accInfoMap.acNo
			}
		}).then((res) => {
			//如果返回结果为成功
			if (Common.returnResult(res.rspHead.returnCode)) {
				if (res.rspBody.returnList != "") {
					//循环取回来的List状态
					res.rspBody.returnList.map(function (item, i) {
						listmap = item;
						//如果交易标志为POS 并且境内外标志为境内
						if (listmap.foreignFlag == "0") {
							if (listmap.transType == "POS") {
								if (listmap.limitStatus == "2" || listmap.limitStatus == "1") {
									limitStatus1 = listmap.limitStatus;
									//金额输入框和时间选择框隐藏
									$(that.refs.atmjiaoyi).show();

									/////////////开始时间结束时间赋值
									//取到时间以--拆分转为字符串取到前4位再取前2位
									let stasplitFirst = listmap.limitTime.split('--').join("").substring(0, 4).substring(0, 2);
									//取到前4位再取后2位
									let stasplitFirst1 = listmap.limitTime.split('--').join("").substring(0, 4).substring(2, 4);
									let stasplitFirst3 = stasplitFirst + ":" + stasplitFirst1;
									if (stasplitFirst == "" && stasplitFirst1 == "") {
										stasplitFirst3 = "00:00"
									}
									//结束时间赋值
									let stasplitFirst4 = listmap.limitTime.split('--').join("").substring(4, 8).substring(0, 2);
									let stasplitFirst5 = listmap.limitTime.split('--').join("").substring(4, 8).substring(2, 4);
									let stasplitFirst6 = stasplitFirst4 + ":" + stasplitFirst5
									if (stasplitFirst == "" && stasplitFirst1 == "") {
										stasplitFirst6 = "00:00"
									}

									/////////////////////////////////////////
									////////金额赋值
									let limitAmo = listmap.limitAmount
									let limitAmo1 = ""
									if (limitAmo != "") {
										limitAmo1 = limitAmo / 100;
									}

									let limitAmo2 = limitAmo1.toString();

									that.setState({
										//把开关展示状态变为开启
										switch1Checked: true,
										//给限制金赋值
										limitAmount1: limitAmo2,
										//给限制时间赋值
										starDate1: stasplitFirst3,
										endDate1: stasplitFirst6
									})
								}
							}
						}
						//如果交易标志为ATM 并且境内外标志为境内
						if (listmap.foreignFlag == "0") {
							if (listmap.transType == "ATM") {
								if (listmap.limitStatus == "2" || listmap.limitStatus == "1") {
									limitStatus2 = listmap.limitStatus;
									//金额输入框和时间选择框隐藏
									$(that.refs.atmjiaoyi1).show();
									/////////////开始时间结束时间赋值
									let stasplitFirst = listmap.limitTime.split('--').join("").substring(0, 4).substring(0, 2);
									let stasplitFirst1 = listmap.limitTime.split('--').join("").substring(0, 4).substring(2, 4);
									let stasplitFirst3 = stasplitFirst + ":" + stasplitFirst1;
									if (stasplitFirst == "" && stasplitFirst1 == "") {
										stasplitFirst3 = "00:00"
									}
									//结束时间赋值
									let stasplitFirst4 = listmap.limitTime.split('--').join("").substring(4, 8).substring(0, 2);
									let stasplitFirst5 = listmap.limitTime.split('--').join("").substring(4, 8).substring(2, 4);
									let stasplitFirst6 = stasplitFirst4 + ":" + stasplitFirst5
									if (stasplitFirst4 == "" && stasplitFirst5 == "") {
										stasplitFirst6 = "00:00"
									}
									/////////////////////////////////////////
									////////金额赋值
									let limitAmo = listmap.limitAmount
									let limitAmo1 = ""
									if (limitAmo != "") {
										limitAmo1 = limitAmo / 100;
									}

									let limitAmo2 = limitAmo1.toString();
									that.setState({
										//把开关展示状态变为开启
										switch1Checked1: true,
										//给限制金赋值
										limitAmount2: limitAmo2,
										//给限制时间赋值
										starDate2: stasplitFirst3,
										endDate2: stasplitFirst6

									})
								}
							}
						}

						//如果交易标志为POS 并且境内外标志为境外
						if (listmap.foreignFlag == "1") {
							if (listmap.transType == "POS") {
								if (listmap.limitStatus == "2" || listmap.limitStatus == "1") {
									limitStatus3 = listmap.limitStatus;
									//金额输入框和时间选择框隐藏
									$(that.refs.atmjiaoyi2).show();
									/////////////开始时间结束时间赋值
									let stasplitFirst = listmap.limitTime.split('--').join("").substring(0, 4).substring(0, 2);
									let stasplitFirst1 = listmap.limitTime.split('--').join("").substring(0, 4).substring(2, 4);
									let stasplitFirst3 = stasplitFirst + ":" + stasplitFirst1;
									if (stasplitFirst == "" && stasplitFirst1 == "") {
										stasplitFirst3 = "00:00"
									}
									//结束时间赋值
									let stasplitFirst4 = listmap.limitTime.split('--').join("").substring(4, 8).substring(0, 2);
									let stasplitFirst5 = listmap.limitTime.split('--').join("").substring(4, 8).substring(2, 4);
									let stasplitFirst6 = stasplitFirst4 + ":" + stasplitFirst5
									if (stasplitFirst4 == "" && stasplitFirst5 == "") {
										stasplitFirst6 = "00:00"
									}
									/////////////////////////////////////////
									////////金额赋值
									let limitAmo = listmap.limitAmount
									let limitAmo1 = ""
									if (limitAmo != "") {
										limitAmo1 = limitAmo / 100;
									}

									let limitAmo2 = limitAmo1.toString();
									that.setState({
										//把开关展示状态变为开启
										switch1Checked3: true,
										//给限制金赋值
										limitAmount3: limitAmo2,
										//给限制时间赋值

										starDate3: stasplitFirst3,
										endDate3: stasplitFirst6

									})
								}
							}

						}
						//如果交易标志为ATM 并且境内外标志为境外
						if (listmap.foreignFlag == "1") {
							if (listmap.transType == "ATM") {
								if (listmap.limitStatus == "2" || listmap.limitStatus == "1") {
									limitStatus4 = listmap.limitStatus;
									//金额输入框和时间选择框隐藏
									$(that.refs.atmjiaoyi4).show();
									/////////////开始时间结束时间赋值
									let stasplitFirst = listmap.limitTime.split('--').join("").substring(0, 4).substring(0, 2);
									let stasplitFirst1 = listmap.limitTime.split('--').join("").substring(0, 4).substring(2, 4);
									let stasplitFirst3 = stasplitFirst + ":" + stasplitFirst1;
									if (stasplitFirst == "" && stasplitFirst1 == "") {
										stasplitFirst3 = "00:00"
									}
									//结束时间赋值
									let stasplitFirst4 = listmap.limitTime.split('--').join("").substring(4, 8).substring(0, 2);
									let stasplitFirst5 = listmap.limitTime.split('--').join("").substring(4, 8).substring(2, 4);
									let stasplitFirst6 = stasplitFirst4 + ":" + stasplitFirst5
									if (stasplitFirst4 == "" && stasplitFirst5 == "") {
										stasplitFirst6 = "00:00"
									}
									/////////////////////////////////////////
									////////金额赋值
									let limitAmo = listmap.limitAmount
									let limitAmo1 = ""
									if (limitAmo != "") {
										limitAmo1 = limitAmo / 100;
									}

									let limitAmo2 = limitAmo1.toString();
									console.log(limitAmo2)
									that.setState({
										//把开关展示状态变为开启
										switch1Checked4: true,
										//给限制金赋值
										limitAmount4: limitAmo2,
										//给限制时间赋值
										starDate4: stasplitFirst3,
										endDate4: stasplitFirst6
									})
								}
							}

						}
					})
				}

			}


			if (limitStatus1 != "" && limitStatus1 != "0") {
				that.setState({
					alockcard1: true
				})
				$(that.refs.myResult).show()
			}
			if (limitStatus2 != "" && limitStatus2 != "0") {
				that.setState({
					alockcard1: true
				})
				$(that.refs.myResult).show()
			}
			if (limitStatus3 != "" && limitStatus3 != "0") {
				that.setState({
					alockcard1: true
				})
				$(that.refs.myResult).show()
			}
			if (limitStatus4 != "" && limitStatus4 != "0") {
				that.setState({
					alockcard1: true
				})
				$(that.refs.myResult).show()
			}


		})
	}

	changeswitchWhole1(checked) {
		let that = this;
		that.setState({
			switchWhole1: checked
		})
	}

	//境内POS限制金额
	// 调用客户端键盘接口
	//  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘 "tradePsw":交易密码键盘 "idcard":身份证键盘
	showKeyBoard = newId => {
		this.cancelKbGb(newId);
		this.setState({
			limitAmount1: "",
			limitAmount1Size: ""
		})
		let that = this;
		//展示光标
		$("#" + newId).show();
		$native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
			type: "amount",
			 //关闭键盘回调函数，并传入关闭的光标的Id
			cancel: that.cancelKb.bind(this,newId),
			success: (res) => {
				let jsons = JSON.parse(res);
				this.setState({
					limitAmount1: jsons.text,
					limitAmount1Size: jsons.pswLength
				});
				showKeyBoard();
			}
		})
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

	// limitAmount1(val) {
	// 	let stasplitFirst = val.split('.').join("");
	// 	let that = this;
	// 	that.setState({
	// 		limitAmount1: stasplitFirst
	// 	})
	// }

	//境内ATM限制金额

	// 调用客户端键盘接口
	//  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码
	showKeyBoard1 = newId => {
		this.cancelKbGb(newId);
		this.setState({
			limitAmount2: "",
			limitAmount2Size: ""
		})
		let that = this;
		//展示光标
		$("#" + newId).show();
		//输入框上移
		Common.pageMoveShow(300);
		$native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
			type: "amount",
			 //关闭键盘回调函数，并传入关闭的光标的Id
			cancel: that.cancelKb.bind(this,newId),
			success: (res) => {
				let jsons = JSON.parse(res);
				this.setState({
					limitAmount2: jsons.text,
					limitAmount2Size: jsons.pswLength
				});
				showKeyBoard1();
			}
		})
		$("#" + newId).show();
	}
	// limitAmount2(val) {
	// 	let stasplitFirst = val.split('.').join("");
	// 	let that = this;
	// 	that.setState({
	// 		limitAmount2: stasplitFirst
	// 	})
	// }

	//境外pos限制金额

	showKeyBoard2 = newId => {
		this.cancelKbGb(newId);
		this.setState({
			limitAmount3: "",
			limitAmount3Size: ""
		})
		let that = this;
		//展示光标
		$("#" + newId).show();
		//输入框上移
		Common.pageMoveShow(400);
		$native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
			type: "amount",
			 //关闭键盘回调函数，并传入关闭的光标的Id
			cancel: that.cancelKb.bind(this,newId),
			success: (res) => {
				let jsons = JSON.parse(res);
				this.setState({
					limitAmount3: jsons.text,
					limitAmount3Size: jsons.pswLength
				});
				showKeyBoard2();
			}
		})
		$("#" + newId).show();
	}
	// limitAmount3(val) {
	// 	let stasplitFirst = val.split('.').join("");
	// 	let that = this;
	// 	that.setState({
	// 		limitAmount3: stasplitFirst
	// 	})
	// }

	//境外ATM限制金额


	showKeyBoard3 = newId => {
		this.cancelKbGb(newId);
		this.setState({
			limitAmount4: "",
			limitAmount4Size: ""
		})
		let that = this;
		//展示光标
		$("#" + newId).show();
		//输入框上移
		Common.pageMoveShow(500);
		$native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
			type: "amount",
			//关闭键盘回调函数，并传入关闭的光标的Id
		   cancel: that.cancelKb.bind(this,newId),
			success: (res) => {
				let jsons = JSON.parse(res);
				this.setState({
					limitAmount4: jsons.text,
					limitAmount4Size: jsons.pswLength
				});
				showKeyBoard3();
			}
		})
		$("#" + newId).show();
	}
	// limitAmount4(val) {
	// 	let stasplitFirst = val.split('.').join("");
	// 	let that = this;
	// 	that.setState({
	// 		limitAmount4: stasplitFirst
	// 	})
	// }
	//一键锁卡 事件
	// clickalockcard = (checked) => {
	// 	console.log(checked)
	// 	this.setState({
	// 		alockcard: checked
	// 	})
	// 	if (checked) {
	// 		this.setState({
	// 			alockcard1: false
	// 		})
	// 		$(this.refs.myResult).hide()
	// 		//给上送的状态赋值
	// 		this.jumpnextpage({
	// 			//境内外标志 2 全部
	// 			foreignFlag: "2",
	// 			//限制状态 2 关闭
	// 			limitStatus: "2",
	// 			//交易类型 1 开关交易
	// 			reuestFlag: "1"
	// 		})
	// 	} else {
	// 		//给上送的状态赋值
	// 		this.jumpnextpage({
	// 			//境内外标志 2 全部
	// 			foreignFlag: "2",
	// 			//限制状态 0 开放
	// 			limitStatus: "0",
	// 			//交易类型 1 开关交易
	// 			reuestFlag: "1"
	// 		})
	// 	}
	// }

	// clickalockcard1 = (checked) => {
	// 	console.log(checked)
	// 	this.setState({
	// 		alockcard1: checked
	// 	})
	// 	if (checked) {
	// 		this.setState({
	// 			alockcard: false,
	// 			switch1Checked: false,
	// 			switch1Checked1: false,
	// 			switch1Checked3: false,
	// 			switch1Checked4: false

	// 		})
	// 		//给上送的状态赋值
	// 		this.jumpnextpage({
	// 			//境内外标志 2 全部
	// 			foreignFlag: "2",
	// 			//限制状态 0 开放
	// 			limitStatus: "0",
	// 			//交易类型 1 开关交易
	// 			reuestFlag: "1"
	// 		})
	// 		$(this.refs.myResult).show()

	// 	} else {
	// 		$(this.refs.myResult).hide()
	// 	}
	// }

	//境内POS onchangee事件
	changeHandle1 = (checked) => {
		//给开关状态赋值
		this.setState({
			switch1Checked: checked,
			fagel:""
		})
		let that = this;
		//如果为true 时间金额输入框显示
		if (checked) {
			$(this.refs.atmjiaoyi).hide();
			//给上送的状态赋值
			that.jumpnextpage({
				//境内外标志 0 境内
				foreignFlag: "0",
				//交易类型POS
				transType: "POS",
				//限制状态 0 开放
				limitStatus: "2",
				//交易类型 1 开关交易
				reuestFlag: "1"
			})
			$(this.refs.atmjiaoyi).show();
			//else 时间金额输入框隐藏
		} else {
			$(this.refs.atmjiaoyi).hide();
			//给上送的状态赋值
			that.jumpnextpage({
				//境内外标志 0 境内
				foreignFlag: "0",
				//交易类型POS
				transType: "POS",
				//限制状态 0 开放
				limitStatus: "0",
				//交易类型 1 开关交易
				reuestFlag: "1",
				limitTime:""
			})
			that.setState({
				//境内POS开始日期
				starDate1: "00:00",
			//境内POS结束日期
				endDate1: "00:00",
				limitAmount1:""
			})

		}

	};


	changeHandle2 = (checked) => {
		console.log(checked)
		this.setState({
			fagel:"",
			switch1Checked1: checked
		})
		let that = this;
		if (checked) {
			that.jumpnextpage({
				foreignFlag: "0",
				transType: "ATM",
				limitStatus: "2",
				reuestFlag: "1"
			})
			$(this.refs.atmjiaoyi1).show();

		} else {

			$(this.refs.atmjiaoyi1).hide();
			

			that.jumpnextpage({
				foreignFlag: "0",
				transType: "ATM",
				limitStatus: "0",
				reuestFlag: "1",
				limitTime:""
			})
			this.setState({
				//境内ATM开始日期
				starDate2: "00:00",
			//境内ATM结束日期
				endDate2: "00:00",
				limitAmount2: ''
			})


		}

	};

	changeHandle3 = (checked) => {

		this.setState({
			switch1Checked3: checked,
			fagel:""
		})
		let that = this;
		if (checked) {
			that.jumpnextpage({
				foreignFlag: "1",
				transType: "POS",
				limitStatus: "2",
				reuestFlag: "1"
			})
			$(this.refs.atmjiaoyi2).show();
		} else {

			$(this.refs.atmjiaoyi2).hide();
			
			
			let that = this;
			that.jumpnextpage({
				foreignFlag: "1",
				transType: "POS",
				limitStatus: "0",
				reuestFlag: "1",
				limitTime:""
			})
			this.setState({
				//境外POS开始日期
			starDate3: "00:00",
			//境外POS结束日期
			endDate3: "00:00",
			limitAmount3: ''
			})

		}
	}

	changeHandle4 = (checked) => {
		let that = this;
		console.log(checked)
		that.setState({
			switch1Checked4: checked,
			fagel:""
		})
		if (checked) {
			that.jumpnextpage({
				foreignFlag: "1",
				transType: "ATM",
				limitStatus: "2",
				reuestFlag: "1",
				limitTime: '',
				limitAmount: ''
			})
			$(that.refs.atmjiaoyi4).show();

		} else {
			$(that.refs.atmjiaoyi4).hide();
			
			
			that.jumpnextpage({
				foreignFlag: "1",
				transType: "ATM",
				limitStatus: "0",
				reuestFlag: "1",
				limitTime: '',
				limitAmount: ''
			})
			this.setState({
				//境外ATM开始日期
			starDate4: "00:00",
			//境外ATM结束日期
			endDate4: "00:00",
			limitAmount4: ''
			})
		}
	}
	//境内POS点击事件
	onclickjumpnex1() {
		$native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
		//还原上移
		Common.pageMoveHide();
		let that = this
		that.setState({
			fagel: "1"
		})
		if (that.state.switch1Checked == true) {
			let starDate1 = this.state.starDate1.split(':').join("");
			let endDate1 = this.state.endDate1.split(':').join("");

			let limitTime = starDate1 + "--" + endDate1;
			let limitAmount = this.state.limitAmount1 * 100;
			let limitAmount1 = limitAmount.toString()
			if (limitAmount1 == "0") {
				limitAmount1 = ""
			}
			if (starDate1 == "0000" && endDate1 == "0000") {
				limitTime = ""
			}
			if (starDate1 != "0000" && endDate1 != "0000") {
				if (starDate1 >= endDate1) {
					let alertDict = {
						title: "提示信息",
						msg: "开始时间不能大于结束时间",
						success_text: "确认"
					}
					Common.showAppDialogAlert(alertDict);

					return
				}
			}



			that.jumpnextpage({
				reuestFlag: "1",
				foreignFlag: "0",
				transType: "POS",
				limitTime: limitTime,
				limitAmount: limitAmount1,
				limitStatus: "2"
			})
		}

		console.log(this.state.limitTime)
	}
	//境内ATM点击事件
	onclickjumpnex2() {
		$native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
		//还原上移
		Common.pageMoveHide();
		let that = this
		that.setState({
			fagel: "1"
		})
		if (that.state.switch1Checked1 == true) {
			let starDate2 = this.state.starDate2.split(':').join("");
			let endDate2 = this.state.endDate2.split(':').join("");
			let limitTime = starDate2 + "--" + endDate2;
			let limitAmount = this.state.limitAmount2 * 100;
			let limitAmount1 = limitAmount.toString()
			if (limitAmount1 == "0") {

				limitAmount1 = ""
			}
			if (starDate2 == "0000" && endDate2 == "0000") {
				limitTime = ""
			}
			if (starDate2 != "0000" && endDate2 != "0000") {
				if (starDate2 >= endDate2) {
					let alertDict = {
						title: "提示信息",
						msg: "开始时间不能大于结束时间",
						success_text: "确认"
					}
					Common.showAppDialogAlert(alertDict);

					return
				}
			}

			that.jumpnextpage({
				reuestFlag: "1",
				foreignFlag: "0",
				transType: "ATM",
				limitTime: limitTime,
				limitAmount: limitAmount1,
				limitStatus: "2"
			})
		}

		console.log(this.state.limitTime)
	}

	onclickjumpnex3() {
		$native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
		//还原上移
		Common.pageMoveHide();
		let that = this
		that.setState({
			fagel: "1"
		})
		if (that.state.switch1Checked3 == true) {
			let starDate3 = this.state.starDate3.split(':').join("");
			let endDate3 = this.state.endDate3.split(':').join("");

			let limitTime = starDate3 + "--" + endDate3;
			if (starDate3 == "0000" && endDate3 == "0000") {
				limitTime = ""
			}
			let limitAmount = this.state.limitAmount3 * 100;
			let limitAmount1 = limitAmount.toString()
			if (limitAmount1 == "0") {

				limitAmount1 = ""
			}
			if (starDate3 != "0000" && endDate3 != "0000") {
				if (starDate3 >= endDate3) {
					let alertDict = {
						title: "提示信息",
						msg: "开始时间不能大于结束时间",
						success_text: "确认"
					}
					Common.showAppDialogAlert(alertDict);

					return
				}
			}

			that.jumpnextpage({
				reuestFlag: "1",
				foreignFlag: "1",
				transType: "POS",
				limitTime: limitTime,
				limitAmount: limitAmount1,
				limitStatus: "2"
			})
		}

	}
	onclickjumpnex4() {
		$native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
		//还原上移
		Common.pageMoveHide();
		let that = this
		that.setState({
			fagel: "1"
		})
		if (that.state.switch1Checked4 == true) {
			let starDate4 = this.state.starDate4.split(':').join("");
			let endDate4 = this.state.endDate4.split(':').join("");
			let limitTime = starDate4 + "--" + endDate4;
			if (starDate4 == "0000" && endDate4 == "0000") {
				limitTime = ""
			}
			let limitAmount = this.state.limitAmount4 * 100;
			let limitAmount1 = limitAmount.toString()
			if (limitAmount1 == "0") {

				limitAmount1 = ""
			}
			if (starDate4 != "0000" && endDate4 != "0000") {
				if (starDate4 >= endDate4) {
					let alertDict = {
						title: "提示信息",
						msg: "开始时间不能大于结束时间",
						success_text: "确认"
					}
					Common.showAppDialogAlert(alertDict);

					return
				}
			}

			that.jumpnextpage({
				reuestFlag: "1",
				foreignFlag: "1",
				transType: "ATM",
				limitTime: limitTime,
				limitAmount: limitAmount1,
				limitStatus: "2"
			})
		}

	}


	//发送交易
	jumpnextpage(param) {
		$native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
		let that = this;
		console.log(param)
		$Fetch(API.API_SET_ACCOUNT_LOCKING, {
			//默认固定上送报文
			reqHead: {
				//场景编码
				sceneCode: "AC03",
				//步骤编码(根据相应步骤填写字段（1,2,3,4）)
				stepCode: "2",
				//交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
				tradeType: "1",
				//交易标识 1-主，2-副
				flag: "1",
				//服务接口版本号 1.0.0
				serviceVersion: "1.0.0"
			},
			// 交易上送报文
			data: {
				//交易请求标志
				reuestFlag: param.reuestFlag,
				//境内外标志
				foreignFlag: param.foreignFlag,
				//卡号
				accountNo: this.state.Detail,
				//交易类型 POS ATM
				transType: param.transType,
				//限制状态  开始  关闭  限制
				limitStatus: param.limitStatus,
				//限制时间
				limitTime: param.limitTime,
				//限制金额
				limitAmount: param.limitAmount
			}
		}).then((res) => {
			//返回状态判断

			if (Common.returnResult(res.rspHead.returnCode)) {
				
				if (this.state.fagel != "") {
					let alertDict = {
						title: "提示",
						msg: "操作成功",
						success_text: "确认"
					}
					Common.showAppDialogAlert(alertDict);
				}

			} else {
				let alertDict = {
					title: "错误提示",
					msg: res.rspHead.returnMsg,
					success_text: "确认"
				}
				Common.showAppDialogAlert(alertDict);
			}
		})
	}

	//境内POS起始日期取值
	onStarDateValueChange1 = (val) => {
		//val = '0701'


		this.setState({
			starDate1: val
		})
	};

	//境内POS结束日期取值
	onEndDateValueChange1 = (val) => {

		this.setState({
			endDate1: val
		})
	};

	////////////////////////////////////////////////////////
	//境内ATM起始日期取值
	onStarDateValueChange2 = (val) => {
		//val = '0701'

		this.setState({
			starDate2: val
		})
	};

	//境内ATM结束日期取值
	onEndDateValueChange2 = (val) => {

		this.setState({
			endDate2: val
		})
	};

	////////////////////////////////////////////////////////
	//境外POS起始日期取值
	onStarDateValueChange3 = (val) => {
		//val = '0701'

		this.setState({
			starDate3: val
		})
	};

	//境外POS结束日期取值
	onEndDateValueChange3 = (val) => {

		this.setState({
			endDate3: val
		})
	};
	////////////////////////////////////////////////////////
	//境外ATM起始日期取值
	onStarDateValueChange4 = (val) => {
		//val = '0701'

		this.setState({
			starDate4: val
		})
	};

	//境外ATM结束日期取值
	onEndDateValueChange4 = (val) => {

		this.setState({
			endDate4: val
		})
	};


	render() {
		let that = this;
		return (
			<div>
				<WhiteSpace size="sm" />
				<List.Group>
					<List title="卡号" description={Common.setAccountNum2(this.state.Detail,true)} />
				</List.Group>
				{/* <List.Group >
					<SwitchLis title="一键锁卡" value={this.state.alockcard} onChange={this.clickalockcard} />
				</List.Group>
				<WhiteSpace size="sm" /> */}
				{/* <List.Group >
					<SwitchLis title="更多锁卡交易" value={this.state.alockcard1} onChange={this.clickalockcard1} />
				</List.Group> */}
				{/* <WhiteSpace size="sm" />
				<Tips content="注:开启一键锁卡时境内外交易都被锁定!" />
				<Tips content="注:开启更多锁卡交易时一键锁卡失效展示单独交易锁卡选项!" /> */}

				<div ref="myResult">
					<List.Group header="境内交易">
						<List.Group>
							<SwitchLis title="POS" value={this.state.switch1Checked} onChange={this.changeHandle1} />
							<div ref="atmjiaoyi" className="register-box" style={{ display: "none" }}>

								<div className="ryt-input-list-item ryt-input-item">
									<div className="ryt-input-label ryt-input-label-4">选择时间</div>
									<div className="ryt-input-control">
										<div className="mbank-date-select">
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onStarDateValueChange1.bind(this)}
												content='开始时间'
												title='开始时间'
												returnType='formatValue'
												content={this.state.starDate1}
											/>
											<div>至</div>
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onEndDateValueChange1.bind(this)}
												content='结束时间'
												title='结束时间'
												returnType='formatValue'
												content={this.state.endDate1}
											/>
										</div>
									</div>
								</div>


								<Input value={this.state.limitAmount1} onClick={this.showKeyBoard.bind(this,"keyboardMoney")} cursorSize={this.state.limitAmount1Size} placeholder="请输入限制金额" maxLength={19} type="amount" id="keyboardMoney" editable={false}>限制金额</Input>
								<Button style={{ border: "none" }} type="ghost" size="default" onTap={this.onclickjumpnex1.bind(this)}>确定</Button>
							</div>
						</List.Group>
						<List.Group >
							<SwitchLis title="ATM" value={this.state.switch1Checked1} onChange={this.changeHandle2} />
							<div ref="atmjiaoyi1" className="register-box" style={{ display: "none" }}>
								<div className="ryt-input-list-item ryt-input-item">
									<div className="ryt-input-label ryt-input-label-4">选择时间</div>
									<div className="ryt-input-control">
										<div className="mbank-date-select">
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onStarDateValueChange2.bind(this)}
												content='开始时间'
												title='开始时间'
												returnType='formatValue'
												content={this.state.starDate2}
											/>
											<div>至</div>
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onEndDateValueChange2.bind(this)}
												content='结束时间'
												title='结束时间'
												returnType='formatValue'
												content={this.state.endDate2}
											/>
										</div>
									</div>
								</div>
								<Input value={this.state.limitAmount2} onClick={this.showKeyBoard1.bind(this,"keyboardMoney1")} cursorSize={this.state.limitAmount2Size} placeholder="请输入限制金额" maxLength={19} type="amount" id="keyboardMoney1" editable={false}>限制金额</Input>
								<Button style={{ border: "none" }} type="ghost" size="default" onTap={this.onclickjumpnex2.bind(this)}>确定</Button>
							</div>
						</List.Group>

					</List.Group>
					<List.Group header="境外交易">
						<List.Group>
							<SwitchLis title="POS" value={this.state.switch1Checked3} onChange={this.changeHandle3} />
							<div ref="atmjiaoyi2" className="register-box" style={{ display: "none" }}>
								<div className="ryt-input-list-item ryt-input-item">
									<div className="ryt-input-label ryt-input-label-4">选择时间</div>
									<div className="ryt-input-control">
										<div className="mbank-date-select">
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onStarDateValueChange3.bind(this)}
												content='开始时间'
												title='开始时间'
												returnType='formatValue'
												content={this.state.starDate3}
											/>
											<div>至</div>
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onEndDateValueChange3.bind(this)}
												content='结束时间'
												title='结束时间'
												returnType='formatValue'
												content={this.state.endDate3}
											/>
										</div>
									</div>
								</div>


								<Input value={this.state.limitAmount3} onClick={this.showKeyBoard2.bind(this,"keyboardMoney2")} cursorSize={this.state.limitAmount3Size} placeholder="请输入限制金额" maxLength={19} type="amount" id="keyboardMoney2" editable={false}>限制金额</Input>
								<Button style={{ border: "none" }} type="ghost" size="default" onTap={this.onclickjumpnex3.bind(this)}>确定</Button>
							</div>
						</List.Group>

						<List.Group>
							<SwitchLis title="ATM" value={this.state.switch1Checked4} onChange={this.changeHandle4} />
							<div ref="atmjiaoyi4" className="register-box" style={{ display: "none" }}>
								<div className="ryt-input-list-item ryt-input-item">
									<div className="ryt-input-label ryt-input-label-4">选择时间</div>
									<div className="ryt-input-control">
										<div className="mbank-date-select">
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onStarDateValueChange4.bind(this)}
												content='开始时间'
												title='开始时间'
												returnType='formatValue'
												content={this.state.starDate4}
											/>
											<div>至</div>
											<DatePickerDemo
												mode='time'
												mixDate={new Date(0, 0, 0, 0, 0, 0)}
												maxDate={new Date(0, 0, 0, 23, 59, 0)}
												onChange={this.onEndDateValueChange4.bind(this)}
												content='结束时间'
												title='结束时间'
												returnType='formatValue'
												content={this.state.endDate4}
											/>
										</div>
									</div>
								</div>

								<Input value={this.state.limitAmount4} onClick={this.showKeyBoard3.bind(this,"keyboardMoney3")} cursorSize={this.state.limitAmount4Size} placeholder="请输入限制金额" maxLength={19} type="amount" id="keyboardMoney3" editable={false}>限制金额</Input>
								<Button style={{ border: "none" }} type="ghost" size="default" onTap={this.onclickjumpnex4.bind(this)}>确定</Button>
							</div>
						</List.Group>
					</List.Group>
					<WhiteSpace size="lg" />
					<WhiteSpace size="lg" />
					<WingBlank size="xxl">
						<Tips title="温馨提示" content="注:一键锁卡开启时境内外ATM/POS均无法进行交易!" />
						<Tips content="注:限制时间(设置限制时间,为本时间段无法进行交易；如未设置,时间限制为全时间段!)" />
						<Tips content="注:限制金额(设置限制金额,为当前交易当天单笔限制金额；如未设置金额,则所有金额皆为限制状态!)" />

					</WingBlank>
					<WhiteSpace size="lg" />
					{/* <ListWord.Group>
				<ListWord content="注:境内/境外上锁时,ATM无法进行账务交易,POS无法刷卡消费!"/>

				<ListWord content="注:限制时间(设置限制时间,为本时间段无法进行交易,如未设置,时间限制为全时间段!)"/>
				<ListWord content="注:限制金额(设置限制金额,为当前交易可使用金额,如未设置金额,则所有金额都不可使用!)"/>

				</ListWord.Group> */}
				</div>
			</div>
		)
	}

}