module.exports = {
    rspHead:{
        returnCode:"00000000"
    },
    rspBody:
        {
            totalNum: "12",//			总条数
            returnList: [
                {
                    prdId: "0001",//		产品ID
                    prdName: "兴业理财",//		产品名称
                    bankAcct: "622121213133",//		银行账号
                    subBankAcct: "0001",//		子账号
                    creType: "10011",//		客户证件类型
                    creNum: "320121213435121",//		客户证件号码
                    canUseVol: "20000",//		可用份额
                    canAppVol: "20000",//		可赎回份额
                    tranFrozVol: "0",//		交易冻结份额
                    abnFrozVol: "0",//		异常冻结份额
                    matuDate:"20180201",
                    listDataDetail://			份额汇总信息
                        [
                            {
                                dealNo: "1212",   // 	    交易编号
                                prdId: "1212",   // 	    产品ID
                                prdName: "1212",   // 	    产品名称
                                canUseVol: "1212",   // 	可用份额
                                tranFrozVol: "1212",   // 	交易冻结份额
                                abnFrozVol: "1212",   // 	异常冻结份额
                            },
                            {
                                dealNo: "1212",   // 	    交易编号
                                prdId: "1212",   // 	    产品ID
                                prdName: "1212",   // 	    产品名称
                                canUseVol: "1212",   // 	可用份额
                                tranFrozVol: "1212",   // 	交易冻结份额
                                abnFrozVol: "1212",   // 	异常冻结份额
                            }
                        ]
                },
                {
                    prdId: "0002",//		产品ID
                    prdName: "兴业理财02",//		产品名称
                    bankAcct: "622121213133",//		银行账号
                    subBankAcct: "0001",//		子账号
                    creType: "10011",//		客户证件类型
                    creNum: "320121213435121",//		客户证件号码
                    canUseVol: "30000",//		可用份额
                    canAppVol: "10000",//		可赎回份额
                    tranFrozVol: "0",//		交易冻结份额
                    abnFrozVol: "0",//		异常冻结份额
                    matuDate:"20180801",
                    listDataDetail://			份额汇总信息
                        [
                            {
                                dealNo: "1212",   // 	    交易编号
                                prdId: "1212",   // 	    产品ID
                                prdName: "1212",   // 	    产品名称
                                canUseVol: "1212",   // 	可用份额
                                tranFrozVol: "1212",   // 	交易冻结份额
                                abnFrozVol: "1212",   // 	异常冻结份额
                            },
                            {
                                dealNo: "1212",   // 	    交易编号
                                prdId: "1212",   // 	    产品ID
                                prdName: "1212",   // 	    产品名称
                                canUseVol: "1212",   // 	可用份额
                                tranFrozVol: "1212",   // 	交易冻结份额
                                abnFrozVol: "1212",   // 	异常冻结份额
                            }
                        ]
                }
            ],
        }
}