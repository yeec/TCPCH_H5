const prefix = 'hk-e-bank-mobile';


// 前置返回超时，密钥重新申请、未登录错误码，请前端APP进行相应的处理（其它错误码，直接报错）：
// CCOE0009,"会话超时"     超时之后，需要发送密钥重新申请，发送原来的交易，根据原来的交易返回的错误码，判断客户是否需要重新登录
// CCOE0149,"报文解密密钥不存在，请重新进行密钥协商，重新发起交易"       只需发送密钥重新申请完成之后发送原交易
// CCOE0150,客户未进行登录，需要进行登录操作之后才能发起交易
// 短信验证失败返回错误码统一返回：CCOE0154
// 密码验证失败返回错误码统一返回：CCOE0155
const errorcode = {
	SESSION_TIMEOUT: 'CCOE0009',
	MESSAGE_KEY_INVALID: 'CCOE0149',
	NOT_LOGIN: 'CCOE0150',
	MESSAGE_ERROR: 'CCOE0154',
	ENCIPHER_ERROR: 'CCOE0155',
};

// 不需要登录的接口（交易需要加密）
const withoutLogin = {
	WITHOUTLOGIN: [
		'system/validateRegisterInfo', //提交注册信息验证
		'system/register', //注册用户信息提交
		'system/verifyForgotPwdInfo', //忘记名密码信息验证
		'system/forgotPwd', //忘记密码信息提交
		'system/smsSend', //获取短信验证码（登录前）
		"financial/queryCustomerRiskLevel", //客户理财风险等级查询
	]
};


// 不需要登录的接口（但是交易需要不加密）
const withoutLoginAndEncipher = {
	WITHOUTLOGINANDENCIPHER: [
		"financial/queryProductList", //获取理财列表
		"financial/queryProductsdetailinfo", //获取理财产品详情
		'system/queryBankNotice', //获取新闻资讯列表

	]
};


const ajax = {
	AJAX_ERROR_FORCE_OUT: 'forceoutError',
	AJAX_ERROR_LOG_TIMEOUT: 'role.invalid_user',
	AJAX_SUCCESS_CODE: '000000',
	AJAX_NET_ERROR: 'net_error',
	AJAX_BUSINESS_ERROR: 'business_error',
	AJAX_LOGIN_TIMEOUT_ERROR: 'timeout_error',
	AJAX_RESUBMIT: 'validation.resubmit_same_token',
	AJAX_SMS_WRONG: 'SSPERROR.3014',
	AJAX_SMS_TIME_OUT: 'SSPERROR.3013',
	AJAX_SMS_NOT_GET: 'validation.sms.noSmsTaskId',
	AJAX_SMS_FORMAT_ERROR: 'validation.pattern',
	AJAX_SMS_ERROR: 'validation.smsotp.error',
	AJAX_SYS_MAINTAIN: 'system.server.maintain',
};
//样例页面接口
const api = {
	API_GET_RECOMMEND_DEPOSIT: 'NativeFecthDemo', //NATIVE发送请求
	API_GET_SUCCESS: 'GetSuccess', //成功
	// API_GET_RECOMMEND_DEPOSIT: 'testMsg',
};
//账户页面接口
const account = {
	// 账户列表
	API_QUERY_ACCOUNT_LIST: 'account/underbarrelAccountNo',
	// 账户详情
	API_QUERY_ACCOUNT_DETAIL: 'account/underbarrelAccountNoTable',
	// 交易明细
	API_QUERY_ACCOUNT_TRANSACTION: 'transfer/tranDetailQuery',
	// 账号加挂
	API_SET_ACCOUNT_ADD: 'account/addAccountNo',
	// 账号解挂
	API_SET_ACCOUNT_DELETE: 'account/deleteAccountNo',
	// 口头挂失
	API_SET_ACCOUNT_LOSS: 'account/oralReportLoss',
	// 账户设置
	API_SET_ACCOUNT_ALIAS: 'SetAccountAlias',
	// 一键锁定/解锁
	API_SET_ACCOUNT_LOCKING: 'account/lockCardOneKey',
	//查询云证通开通标识
	API_QUERY_CST_BANK_SECURITIES: 'transfer/queryCstBankSecurities'
};

//转账模块接口
const transfer = {
	API_GET_GENSIGNATURE: 'transfer/genSignature', //云证通机构签名
	API_GET_CHECK_OPEN_YZTUSER_INFO: 'transfer/checkOpenYztUserInfo', //云证通开通认证
	API_GET_CHECK_SAME_TRANSFER: 'transfer/checkSameTransfer', //查询重复转账
	API_GET_RECENT_TRANSFER: 'transfer/queryAllRecvPersonGroupByName', //获取最近转账列表
	API_GET_OWN_ACCOUNTS: "account/underbarrelAccountNo", //"GetOwnAccounts", //获取转出账户列表
	API_GET_TRANSFER_SUBBANKNO: "transfer/transferSubBankNo", //查询子收款银行
	API_GET_TRANSFER_BANK: "transfer/transferPmsBankNo", //查询收款银行
	API_GET_TRANSFER_LIST: "transfer/queryAllRecvPersonGroupByLetter", //查询收款人列表
	API_GET_NEWPAYEE_PAYEE: "transfer/addRecvPersonInfo", //新增收款人
	API_GET_DELETE_PAYEE: "transfer/deleteRecvPersonInfo", //删除收款人
	API_GET_MODIFY_PAYEE: "transfer/updateRecvPersonInfo", //修改收款人
	API_GET_MOBILE_TRANSFER_CONFIRMDATA: "GetMobileTransferComfirmData", //手机号转账确认页面
	API_QUERY_TRANSFER_DETAIL: "transfer/queryTransferDetail", //转账交易明细查询
	API_QUERY_REVOKE_DETAIL: "transfer/queryRevocableTransfer", //转账查询可撤销交易
	API_REVOKE_REVOCABLE_DETAIL: "transfer/updateRevocableTransfer", //转账撤销交易
	API_QUERY_CSTLIMIT: "transfer/queryCstLimit", //查询限额
	API_GET_TRANSFER_PEOPLE_INNERBANK: "GetTransferPeopleInnerbank", //查询行内收款人列表
	API_GET_TRANSFER_CONFIRMDATA: "GetTransferComfirmData", //获取转账明细确认信息
	API_GET_AUTHCODE: "system/smsSend", //获取短信验证码（登录前）
	API_GET_AUTHCODE_AFTER_LOGIN: "system/smsSendLogin", //获取短信验证码（登录后）
	API_GET_TRANSFER_PHONEVERIFY: "GetTransferPhoneVerify", //验证短信验证码正确性及时效
	API_GET_TRANSFER_RESULT: "transfer/transferByMobileBank", //获取转账结果
	API_SAVE_PAYEE_MESSAGE: "SavePayeeMessage", //保存本次收款账户信息
	API_SAVE_PAYEE_QUERYREAL: "system/queryRealTransfer", //查询大额通道是否通顺
	API_SAVE_PAYEE_QUERYSAFETOOL: "transfer/querySafeTool", //安全认证方式

};


//注册接口
const register = {
	API_REGISTER_INFORMATION_DATA: 'system/validateRegisterInfo', //提交注册信息验证
	API_INFORMATIONSUBMISSION_DATA: 'system/register', //注册用户信息提交
};

//忘记密码接口
const forgotpassword = {
	API_RESETPASSWORDSUBMISSION_DATA: 'system/verifyForgotPwdInfo', //忘记名密码信息验证
	API_FORGOTPASSWORD_DATA: 'system/forgotPwd', //忘记密码信息提交
};


//登录密码修改接口
const passwordreset = {
	API_PASSWORD_USER_DATA: 'PasswordUserData', //修改登录密码用户信息提交
	API_PASSWORD_RESET_DATA: 'PasswordResetData', //提交登录密码修改数据
};


//储蓄模块接口
const savings = {
	// //获取(定期+巨划算A、B+随心存B)列表
	API_GET_REGULAR_LIST: "account/queryAccDetailByCstNo",
	//获取(定期+巨划算A、B+随心存B)列表
	API_GET_SXCLIST_LIST: "system/queryProList",
	//获取定活互转列表详情
	API_QUERY_REGULAR_Detail: "account/queryRegularAccDetail",
	//定转活(定期+巨划算A、B+随心存B)
	API_SET_DING_ZHUAN_HUO: "account/regularCurrentAccount",
	//活转定(定期+巨划算A、B+随心存B)
	API_SET_HUO_ZHUAN_DING: "account/currentToRegular",
	//巨划算存本取息销户
	API_SET_DING_ZHUAN_HUO_NEW: "feature/closeKesalanInterestWithdrawalAccount",
	//定活互转查询利率
	API_QUERY_REGULAR_LV: "account/selectInterestRateAction",
	//定期明细
	API_QUERY_REGULAR_MX: "transfer/tranDetailByJHSQuery"
};

//投资模块接口
const invest = {
	//获取随心存A列表
	API_GET_SXC_A_LIST: "feature/selectKeepInMindDeposit",
	//随心存A修改
	API_SET_SXC_A_INFOT: 'feature/keepInMindDepositAgreement',
}

//理财模块接口
const financing = {
	API_QUERY_PRODUCT_LIST: "financial/queryProductList", //获取理财列表
	API_QUERY_PRODUCT_DETAIL: "financial/queryProductsdetailinfo", //获取理财产品详情
	API_GET_FINANCE_PURCHASE: "financial/purchaseProduct", //理财产品购买(追加)
	API_QUERY_CUSTOM_RISK_LEVEL_RESULT: "financial/queryCustomerRiskLevel", //客户理财风险等级查询
	API_GET_CUSTOM_RISK_LEVEL_RESULT: "financial/evaluationCustomerRiskLevel", //评估客户理财风险等级
	API_QUERY_HOLD_PRODUCT_LIST: "financial/queryCustomersCanShare", //查询持有产品
	API_QUERY_HOLD_PRODUCT_DETAIL: "QueryHoldProductDetail", //持有产品详情
	API_QUERY_ENTRUST_PRODUCT_LIST: "financial/queryOrderCancellationTransaction", //查询委托产品
	API_GET_REDEMPTION_PRODUCT: "financial/redemptionProduct", //理财赎回
	API_GET_CANCLE_PRODUCT: "financial/cancelProduct", //理财撤销
	API_SELECT_HISTORY_TRANS_DETAILS: "financial/selectHistoryTransDetails", //查询理财交易
	API_UNDERBAR_REL_ACCOUNT_FIN: "account/underbarrelAccountFin", //下挂账户列表查询（理财）
	API_QUERY_PRODUCT_SRESIDUAL_AMOUNT: "financial/queryProductsResidualAmount", //产品剩余额度查询
	API_FINANCIAL_GET_INSTRUCTIONS: "financial/getInstructions", //理财说明书内容查询
	API_QUERY_FINANCIAL_CALENDAR: "financial/queryFinancialCalendar", //获取金融日历
};

//公共功能模块接
const publicModule = {
	API_PUBLIC_NEWS_LIST: 'system/queryBankNotice', //获取新闻资讯列表
	API_PUBLIC_NEWS_DETAIL: 'BankNewsDetail', //获取新闻资讯详细
	API_PUBLIC_CUSTOMER_FEEDBACK: 'system/addCustomerVoice', //客户反馈
};

//我的总资产模块接口
const totalassets = {
	API_TOTALASSETS_LIST: '/account/totalAssetsForCustomer', //获取我的所有资产列表

};

//公共功能模块接
const yinzheng = {
	API_YINZHENG_LIST: 'YinZhengAccountList', //获取第三方存款账户列表
	API_YINZHENG_DETAIL: 'YinZhengAccountDetail', //获取第三方存款账户详细信息
};

//公共验证提示信息
const promptMessage = {
	PROMPT_MESSAGE_PASSWORD: "请输入6位数字的交易密码", //密码错误提示信息
	PROMPT_MESSAGE_MONEY: "请输入金额" //密码错误提示信息
};
//与客户端交互接口
const native = {
	NATIVE_CODE_LOGOUT: 'LogOut', //退出
	NATIVE_CODE_QUICK_OPEN_YZTWITHUSERINFO: 'quickOpenYZTWithUserInfo', //云证通快速开通
	NATIVE_CODE_YZTMESSAGESIGN: 'yztMessageSign', //云证通签名
	NATIVE_CODE_VERTIFY_YZT_STATUS: 'vertifyYZTStatus', //云证通验证
	NATIVE_CODE_OPEN_YZTWITHUSER_INFO: 'openYZTWithUserInfo', //云证通开通
	NATIVE_CODE_DOWNLOAD_CERTIFICATE: 'downLoadCertificate', //云证通下载
	NATIVE_CODE_SET_ALERT_INFO: 'setAlertInfo', //客户端弹框
	NATIVE_CODE_UPDATE_TITLE: 'setNavBar', //客户端标题
	NATIVE_CODE_LOADNEWPAGE: 'loadNewPage', //跳转新页面
	NATIVE_CODE_STOREDATA: 'storeData', //页面跳转传参数
	NATIVE_CODE_SHOW_BACK_BUTTON: 'showBackButton', //返回首页
	NATIVE_CODE_SET_TITLE_VISIBLE: 'isShowNavgationBar', //显示隐藏客户端标题
	NATIVE_CODE_SHOW_WEBVIEW_BACKBUTTON: 'showWebviewBackButton', //设置客户端导航栏默认返回按钮
	NATIVE_CODE_SHOW_CLOSEBUTTON: 'showCloseButton', //设置客户端导航栏关闭按钮
	NATIVE_CODE_SET_WAIT_PANEL: 'setWaitPanel', //等待层显示隐藏
	NATIVE_CODE_IS_SUPPORT_NFC: 'isSupportNFC', //是否支持NFC
	NATIVE_CODE_TONFC: 'toNFC', // NFC
	NATIVE_CODE_IS_SUPPORT_FINGERPRINT: 'isSupportFingerprintVerify', //是否支持指纹
	NATIVE_CODE_TO_FINGERPRINT_VERIFY: 'toFingerprintVerify', //调指纹验证接口功能
	NATIVE_CODE_ENCRYPTRQBODY: 'encryptRqbody', //aes加密
	NATIVE_CODE_DECRYPTRQBODY: 'decryptRqbody', //aes解密
	NATIVE_CODE_RSAENCRYPTDATA: 'rsaEncryptData', //ras加密
	NATIVE_CODE_SHOWKEYBOARD: 'showKeyBoard', //调用客户端键盘
	NATIVE_CODE_HIDEKEYBOARD: 'hideKeyBoard', //关闭客户端键盘
	NATIVE_CODE_TO_LOGIN: 'toLogin', //登录
	NATIVE_CODE_IS_LOGIN: 'isLogin', //判断是否登录
	NATIVE_CODE_TO_GOBACK: 'goBack', //返回
	NATIVE_CODE_CLOSE: 'close', //关闭
	NATIVE_CODE_SELECTPIC: 'selectPic', //关闭
	NATIVE_CODE_SCAN_QRCODE: 'scanQRCode', //扫描二维码
	NATIVE_CODE_SHAREWEB: 'shareWeb', //分享
	NATIVE_CODE_GET_CLIENT_INFO: 'getClientInfo', //获取客户端信息
	NATIVE_CODE_GET_LOCATION: 'getLocation', //获取位置信息
	NATIVE_CODE_SET_NAVGATIONBAR: 'setNavgationBar', //设置导航栏
	NATIVE_CODE_WEBVIEWBACK: 'webviewBack', //后退
	NATIVE_CODE_REFRESHWEBVIEW: 'refreshWebview', //刷新
	NATIVE_CODE_GET_ADDRESSBOOK: 'getAddressBook', //打开通讯录
	NATIVE_CODE_GETRANDOM: 'getRandom', //获取随机数
	NATIVE_CODE_OPEN_PDF: 'openPDF',
	NATIVE_CODE_BANK_OCR: 'getBankID', //OCR银行卡扫描
	NATIVE_CODE_CARDID_OCR: 'getCardID', //身份证扫描
};

// 红包接口
const redPacket = {
	NATIVE_CODE_RED_PACKET: 'prd/queryShelfAllInfo', // 
}

//session命名存放
const session = {
	SESSION_ACCOUNT_DATA: 'mbankAccountList', // 账户信息
	SESSION_ACCOUNT_DATA_LIST: 'mbankAccountDataList', // 账户信息
	SESSION_TRANSFER_USER_DATA: 'transferUserData', //收款人信息
	SESSION_TRANSFER_USER_TONGDAO: 'daxiaoetongdao', //转账大小额通道状态
	SESSION_TRANSFER_USER_EDIT_DATA: 'transferUserEditData', //收款人信息
	SESSION_TRANSFE_RRESULTDATA: 'transferResultData', //转帐结果
	SESSION_TRANSFER_RESULTCALLBACK: 'transferresultcallback', //转账结果界面跳转传值
	SESSION_TRANSFER_PHONENUM: 'transferPhoneNum', //行内外转账短信验证码发送手机号
	SESSION_SMS_DATA: 'smsData', //手机短信发送
	SESSION_SMS_DATA_AFTER_LOGIN: 'session_sms_data_after_login', //登录后短信发送
	SESSION_TRANSFER_CONFIRMDATA: 'transferConfirmData', //转账确认页面信息
	SESSION_AUTH_CODE_RANDOM: 'AuthCodeRandom', //短信验证码随机数
	SESSION_SAVE_TRANFERTNDATA: 'saveTranferTnData', //保存本次转账收款人信息
	SESSION_SAVE_CURRENTKEYDATA: 'currentKeyData', //保存当前选中账户key值
	SESSION_SAVE_AUTHCODEDATA: 'authCodeData', //保存验证码
	SESSION_VERIFICATION_PHONEA: 'passwodionverification2', //保存忘记密码页面的值传到下个页面
	SESSION_VERIFICATION_PHONEAA: 'informationverification1', //保存注册页面的值传到下个页面
	SESSION_REGISTER_DATA: 'informationverification', //保存注册页面所有输入的值
	SESSION_REGISTER_PHONEA: 'registerUseraName', //保存找回密码信息验证页面回显的用户名
	SESSION_PASSWORD_RESETAPPLY: 'passwordResetApplyReturn', //保存登录密码重置申请返回数据
	SESSION_YINZHENG_ACCOUNT_INFO: 'yinZhengAccountIfno', //银行转账账户信息
	//理财
	SESSION_FINANCE_PRODUCT_INFO: 'GetFinanceProductInfo', //理财产品信息
	SESSION_FINANCE_PRODUCT_DETAIL: 'GetFinanceProductDetail', //理财产品信息详情
	SESSION_FINANCE_PRODUCT_BUY_INFO: 'GetFinanceProductBuyInfo', //理财产品信息
	SESSION_FINANCE_PRODUCT_PURCHASE_RESTULT: 'GetFinanceProductPurchaseResult', //理财产品购买结果
	SESSION_FINANCE_PRODUCT_CANCLE_RESTULT: 'GetFinanceProductCancleResult', //理财撤单结果
	SESSION_FINANCE_PRODUCT_ADD_RESTULT: 'GetFinanceProductAddResult', //理财追加结果
	SESSION_FINANCE_PRODUCT_PURCHASE_HOLD: 'GetFinanceProductPurchaseHold', //持有理财产品数据
	SESSION_FINANCE_PRODUCT_PURCHASE_ENTRUST: 'GetFinanceProductPurchaseEntrust', //当前委托理财数据
	SESSION_CUSTOM_RISK_LEVEL: 'financial/evaluationCustomerRiskLevel', //客户理财风险等级
	SESSION_FINANCE_PRODUCT_PROTOCOL: 'GetFinanceProductProtocol', //理财产品协议查询
	//SAVING
	SESSION_SAVING_REGULAR_AC_NO: 'savingRegularAcNo', //储蓄 定期账号
	// 收款人
	SESSION_TRANSFER_USER_INFO: 'transferUserInfo', //收款人信息
	//新闻
	SESSION_JOURNALISM_INFO: 'journalism', //新闻资讯
	// 投资----巨划算，随心存
	SESSION_INVEST_JHS_AC_NO: 'investJhsAcNo', //巨划算 定期账号
	SESSION_INVEST_JHX_AB_LEIXIN: 'investJHSABfagel', //巨划算活转定交易类型
	SESSION_INVEST_JHX_AB_JRBZ: 'investJHSABjrbz', //巨划算活转定交易类型
	SESSION_INVEST_SXC_B_INFO: 'investSxcBAcNo', //随心存B款 定期账号
	SESSION_INVEST_JHS_INTRODUCE_TO_LIST: 'investJhsIntroduceToIntroduce',
	SESSION_INVEST_SXC_INTRODUCE_TO_LIST: 'investSxcIntroduceToIntroduce',
	SESSION_INVEST_JHS_AB_ACCOUNT: 'investJHSABaccount', //巨划算收息、零整账号
	SESSION_INVEST_JHS_LIXI_MESSAGE: 'investJHSliXiMessage', //收息账号+昵称
	// 扫码付
	SESSION_INVEST_SMF_MESSAGE: 'smfMessage' //收息账号+昵称

};


export default Object.assign({}, errorcode, withoutLogin, withoutLoginAndEncipher, ajax, api, account, transfer, native, session, savings, invest, financing, register, forgotpassword, passwordreset, publicModule, totalassets, yinzheng, promptMessage,redPacket);