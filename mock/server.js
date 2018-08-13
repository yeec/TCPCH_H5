var app = require('koa')();
var router = require('koa-router')();
var koaBody = require('koa-body')();
/**-------------------------------------------------------------------------------------
 * 账户管理mock数据
 * 1.账户列表   /account/underbarrelAccountNo
 * 2.账户详情   /account/underbarrelAccountNoTable
 * 3.交易明细   
 * 4.账号加挂   /account/addAccountNo
 * 5.账号解挂   /account/deleteAccountNo
 * 6.口头挂失   /account/oralReportLoss
 * 7.账户设置
 * 8.一键锁定/解锁
 */

//金融日历
var QueryFinancialCalendar = require('./FinanceMock/queryFinancialCalendar.js')
router.post('/mock/financial/queryFinancialCalendar', function* (next) {
    console.log(QueryFinancialCalendar)
    this.body = QueryFinancialCalendar
});

//账户列表
var QueryAccountList = require('./AccountMock/QueryAccountList.js')
router.post('/mock/account/underbarrelAccountNo', function* (next) {
    console.log(QueryAccountList)
    this.body = QueryAccountList
});

//账户详情
var QueryAccountDetail = require('./AccountMock/QueryAccountDetail.js')
router.post('/mock/account/underbarrelAccountNoTable', function* (next) {
    console.log(QueryAccountDetail)
    this.body = QueryAccountDetail
});

//交易明细
var QueryAccountTransaction = require('./AccountMock/QueryAccountTransaction.js')
router.post('/mock/transfer/tranDetailQuery', function* (next) {
    console.log(QueryAccountTransaction)
    this.body = QueryAccountTransaction
});

//账号加挂
var SetAccountAdd = require('./AccountMock/SetAccountAdd.js')
router.post('/mock/account/addAccountNo', function* (next) {
    console.log(SetAccountAdd)
    this.body = SetAccountAdd
});
//账号解挂
var SetAccountDelete = require('./AccountMock/SetAccountDelete.js')
router.post('/mock/account/deleteAccountNo', function* (next) {
    console.log(SetAccountDelete)
    this.body = SetAccountDelete
});
//口头挂失
var SetAccountLoss = require('./AccountMock/SetAccountLoss.js')
router.post('/mock/account/oralReportLoss', function* (next) {
    console.log(SetAccountLoss)
    this.body = SetAccountLoss
});

//理财产品列表
const QueryProductList = require('./FinanceMock/QueryProductList.js');
router.post('/mock/financial/queryProductList', function* (next) {
    console.log(QueryProductList);
    this.body = QueryProductList
});

//理财产品详情
const QueryProductDetail = require('./FinanceMock/QueryProductDetail.js');
router.post('/mock/financial/queryProductsdetailinfo', function* (next) {
    console.log(QueryProductDetail);
    this.body = QueryProductDetail
});

//持有理财产品列表
const QueryHoldProductList = require('./FinanceMock/QueryHoldProductList.js');
router.post('/mock/financial/queryCustomersCanShare', function* (next) {
    console.log(QueryHoldProductList);
    this.body = QueryHoldProductList
});


//委托理财产品列表
const QueryEntrustProductList = require('./FinanceMock/QueryEntrustProductList.js');
router.post('/mock/financial/queryOrderCancellationTransaction', function* (next) {
    console.log(QueryEntrustProductList);
    this.body = QueryEntrustProductList
});

//持有理财产品详情
const QueryHoldProductDetail = require('./FinanceMock/QueryHoldProductDetail.js');
router.post('/mock/QueryHoldProductDetail', function* (next) {
    console.log(QueryHoldProductDetail);
    this.body = QueryHoldProductDetail
});

//理财购买
const GetFinancePurchase = require('./FinanceMock/GetFinancePurchase.js');
router.post('/mock/financial/purchaseProduct', function* (next) {
    console.log(GetFinancePurchase);
    this.body = GetFinancePurchase
});

//理财撤单
const GetFinanceCancel = require('./FinanceMock/GetFinanceCancel.js');
router.post('/mock/financial/cancelProduct', function* (next) {
    console.log(GetFinanceCancel);
    this.body = GetFinanceCancel
});

//理财赎回
const GetFinanceRedemption = require('./FinanceMock/GetFinanceRedemption.js');
router.post('/mock/financial/redemptionProduct', function* (next) {
    console.log(GetFinanceRedemption);
    this.body = GetFinanceRedemption
});

//客户风险等级查询
const QueryCustomRiskLevelResult = require('./FinanceMock/QueryCustomRiskLevelResult.js');
router.post('/mock/financial/queryCustomerRiskLevel', function* (next) {
    console.log(QueryCustomRiskLevelResult);
    this.body = QueryCustomRiskLevelResult
});

//客户风险等级评估
const GetCustomRiskLevelResult = require('./FinanceMock/GetCustomRiskLevelResult.js');
router.post('/mock/financial/evaluationCustomerRiskLevel', function* (next) {
    console.log(GetCustomRiskLevelResult);
    this.body = GetCustomRiskLevelResult
});

//理财交易查询
const QueryFinanceBusinessList = require('./FinanceMock/QueryFinanceBusinessList.js');
router.post('/mock/financial/selectHistoryTransDetails', function* (next) {
    console.log(QueryFinanceBusinessList);
    this.body = QueryFinanceBusinessList
});

//产品剩余额度查询
const QueryProductsResidualAmount = require('./FinanceMock/QueryProductsResidualAmount.js');
router.post('/mock/financial/queryProductsResidualAmount', function* (next) {
    console.log(QueryProductsResidualAmount);
    this.body = QueryProductsResidualAmount
});

//下挂账户列表查询（理财）
const UnderbarrelAccountFin = require('./FinanceMock/UnderbarrelAccountFin.js');
router.post('/mock/account/underbarrelAccountFin', function* (next) {
    console.log(UnderbarrelAccountFin);
    this.body = UnderbarrelAccountFin
});


//获取转账列表
var GetTransferList = require('./FetchDemo/GetTransferList.js')
router.post('/mock/GetTransferList', function* (next) {
    console.log(GetTransferList)
    this.body = GetTransferList
});
//获取手机转账明细确认信息
var GetMobileTransferComfirmData = require('./FetchDemo/GetMobileTransferComfirmData.js')
router.post('/mock/GetMobileTransferComfirmData', function* (next) {
    console.log(GetMobileTransferComfirmData)
    this.body = GetMobileTransferComfirmData
});

//获取最近转账列表
var queryAllRecvPersonGroupByName = require('./FetchDemo/queryAllRecvPersonGroupByName.js')
router.post('/mock/transfer/queryAllRecvPersonGroupByName', function* (next) {
    console.log(queryAllRecvPersonGroupByName)
    this.body = queryAllRecvPersonGroupByName
});

//获取转出账户列表
var GetOwnAccounts = require('./FetchDemo/GetOwnAccounts.js')
router.post('/mock/GetOwnAccounts', function* (next) {
    console.log(GetOwnAccounts)
    this.body = GetOwnAccounts
});
/**-------------------------------------------------------------------------------------
 * 储蓄服务mock数据
 * 1.定活互转列表   
 * 1.定活互转列表详情    
 * 2.定转活   /account/regularCurrentAccount
 * 3.活转定   /account/currentToRegular
 */
//获取定活互转列表
var GetFixedList = require('./FixedMock/GetFixedList.js')
router.post('/mock/GetFixedList', function* (next) {
    console.log(GetFixedList)
    this.body = GetFixedList
});

//获取定活互转列表详情
var GetFixedListDetail = require('./FixedMock/GetFixedListDetail.js')
router.post('/mock/GetFixedListDetail', function* (next) {
    console.log(GetFixedListDetail)
    this.body = GetFixedListDetail
});

//定转活
var GetDingZhuanHuo = require('./FixedMock/GetDingZhuanHuo.js')
router.post('/mock/account/regularCurrentAccount', function* (next) {
    console.log(GetDingZhuanHuo)
    this.body = GetDingZhuanHuo
});

//活转定
var GetHuoZhuanDing = require('./FixedMock/GetHuoZhuanDing.js')
router.post('/mock/account/currentToRegular', function* (next) {
    console.log(GetHuoZhuanDing)
    this.body = GetHuoZhuanDing
});


/**----------------------------------------------------------------------------------------
*收款人增删改查接口
*1.收款人列表   /transfer/queryAllRecvPersonGroupByLetter
*2.收款人添加   /transfer/addRecvPersonInfo
*3.收款人删除   /transfer/deleteRecvPersonInfo
*4.收款人修改   /transfer/updateRecvPersonInfo
*5.查询收款行   /transfer/transferPmsBankNo
*/
var Payee = "mbank"

// //查询收款银行
// var GetTransferBank = require('./FetchDemo/GetTransferBank.js')
// router.post('/mock/GetTransferBank',function*(next) {
//     console.log(GetTransferBank)
//     this.body = GetTransferBank
// });

//查询收款人列表
var GetTransferPeople = require('./FetchDemo/queryAllRecvPersonGroupByLetter.js')
router.post('/mock/transfer/queryAllRecvPersonGroupByLetter', function* (next) {
    console.log(GetTransferPeople)
    this.body = GetTransferPeople
});
//添加收款人

var GetTransferaddpayee = require('./FetchDemo/GetTransferPeople.js')
router.post('/mock/transfer/addRecvPersonInfo', function* (next) {
    console.log(GetTransferPeople)
    this.body = GetTransferPeople
});

//删除收款人接口

var deleteRecvPersonInfo = require('./FetchDemo/deleteRecvPersonInfo.js')
router.post('/mock/transfer/deleteRecvPersonInfo', function* (next) {
    console.log(deleteRecvPersonInfo)
    this.body = deleteRecvPersonInfo
});

//修改收款人接口

var updateRecvPersonInfo = require('./FetchDemo/deleteRecvPersonInfo.js')
router.post('/mock/transfer/updateRecvPersonInfo', function* (next) {
    console.log(updateRecvPersonInfo)
    this.body = updateRecvPersonInfo
});

//查询收款行

var transferPmsBankNo = require('./FetchDemo/transferPmsBankNo.js')
router.post('/mock/transfer/transferPmsBankNo', function* (next) {
    console.log(transferPmsBankNo)
    this.body = transferPmsBankNo
});

//查询行内收款人列表
var GetTransferPeopleInnerbank = require('./FetchDemo/GetTransferPeopleInnerbank.js')
router.post('/mock/GetTransferPeopleInnerbank', function* (next) {
    console.log(GetTransferPeopleInnerbank)
    this.body = GetTransferPeopleInnerbank
});



//获取转账明细确认信息
var GetTransferComfirmData = require('./FetchDemo/GetTransferComfirmData.js')
router.post('/mock/GetTransferComfirmData', function* (next) {
    console.log(GetTransferComfirmData)
    this.body = GetTransferComfirmData
});

//获取短信验证码
var GetAuthCode = require('./FetchDemo/GetAuthCode.js')
router.post('/mock/GetAuthCode', function* (next) {
    console.log(GetAuthCode)
    this.body = GetAuthCode
});

//验证短信验证码正确性及时效 暂时未使用
// var GetTransferPhoneVerify = require('./FetchDemo/GetTransferPhoneVerify.js')
// router.post('/mock/GetTransferPhoneVerify',function*(next) {
//     console.log(GetTransferPhoneVerify)
//     this.body = GetTransferPhoneVerify
// });

//获取转账结果
var GetTransferResult = require('./FetchDemo/GetTransferResult.js')
router.post('/mock/GetTransferResult', function* (next) {
    console.log(GetTransferResult)
    this.body = GetTransferResult
});

//保存本次收款账户信息
var SavePayeeMessage = require('./FetchDemo/SavePayeeMessage.js')
router.post('/mock/SavePayeeMessage', function* (next) {
    console.log(SavePayeeMessage)
    this.body = SavePayeeMessage
});



//提交注册号信息验证
var RegisterPhoneData = require('./FetchDemo/validateRegisterInfo.js')
router.post('/mock/system/validateRegisterInfo', function* (next) {
    console.log(RegisterPhoneData)
    this.body = RegisterPhoneData
});

//注册用户信息提交
var RegisterUserData = require('./FetchDemo/register.js')
router.post('/mock/system/register', function* (next) {
    console.log(RegisterUserData)
    this.body = RegisterUserData
});



//修改登录密码用户信息提交
var PasswordUserData = require('./FetchDemo/verifyForgotPwdInfo.js')
router.post('/mock/system/verifyForgotPwdInfo', function* (next) {
    console.log(PasswordUserData)
    this.body = PasswordUserData
});

//修改登录密码页面
var PasswordUserData = require('./FetchDemo/forgotPwd.js')
router.post('/mock/system/forgotPwd', function* (next) {
    console.log(PasswordUserData)
    this.body = PasswordUserData
});


// //登录密码修改数据接口
// var PasswordResetData = require('./FetchDemo/PasswordResetData.js')
// router.post('/mock/PasswordResetData',function*(next) {
//     console.log(PasswordResetData)
//     this.body = PasswordResetData
// });

//新闻资讯列表数据接口
var queryBankNotice = require('./FetchDemo/queryBankNotice.js')
router.post('/mock/system/queryBankNotice', function* (next) {
    console.log(queryBankNotice)
    this.body = queryBankNotice
});

// //新闻资讯详情数据接口
// var BankNewsDetail = require('./FetchDemo/BankNewsDetail.js')
// router.post('/mock/BankNewsDetail',function*(next) {
//     console.log(BankNewsDetail)
//     this.body = BankNewsDetail
// });

//吐嘈数据接口
var CustomerFeedback = require('./FetchDemo/CustomerFeedback.js')
router.post('/mock/CustomerFeedback', function* (next) {
    console.log(CustomerFeedback)
    this.body = CustomerFeedback
});

//银证转账列表接口
var YinZhengAccountList = require('./FetchDemo/YinZhengAccountList.js')
router.post('/mock/YinZhengAccountList', function* (next) {
    console.log(YinZhengAccountList)
    this.body = YinZhengAccountList
});
//银证转账详细接口
var YinZhengAccountDetail = require('./FetchDemo/YinZhengAccountDetail.js')
router.post('/mock/YinZhengAccountDetail', function* (next) {
    console.log(YinZhengAccountDetail)
    this.body = YinZhengAccountDetail
});

//Post 上送=返回 
// var FetchPostSameDemo = require('./FetchDemo/FetchPostDemo.js')
router.post('/mock/FetchPostSameDemo', koaBody, function* (next) {
    console.log(this.request.body)
    this.body = JSON.stringify(this.request.body)
});
// 开始服务并生成路由
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);