module.exports = {
    rspHead:{
        returnCode:"00000000"
    },
    rspBody:
        {
            dealNo: "12121212",//		流水号
            prdId	: "0001",//	产品ID
            prdName	: "盛京州理财",//	产品名称
            bankAcct: "6213131114242",//		银行账号
            subBankAcct	: "",//	子账号

            creType: "身份证",//		客户证件类型
            creNum: "320721199121212121",//		客户证件号码

            agentName: "",//		经办人姓名
            agentCreType: "",//		经办人证件类型
            agentCreNum: "",//		经办人证件号码

            cusType			:"",//客户类型
            agentChkType	:"",//		经办人识别方式
            appVol			:"2222",//赎回份额
            cashPrinAmt		:"",//	兑付本金
            cashPrinIncome	:"",//兑付收益
            ackDate			:"",//交易确认日
            clrPayDate		:"",//	回款支付日:"/,/

        }

};