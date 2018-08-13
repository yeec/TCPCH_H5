module.exports = {
    rspHead:{
        returnCode:"00000000"
    },
    rspBody:{
        totalNum:"4",
        returnList:
            [
                {
                    Balance: 120000,
                    productState:"成功",
                    Flag: "理财购买",
                    Account: "6217 **** **** 5876",
                    productName: "张弓长",
                    productID: "0001",
                    TranDate01: "2017.05.10",
                    TranTime: "20:55",
                    productHold: 300,
                    productType: "购买",

                },
                {
                    Balance: 1000,
                    productState:"失败",
                    Flag: "理财赎回",
                    Account: "6217 **** **** 5876",
                    productName: "李木子",
                    productID: "0002",
                    TranDate01: "2017.05.13",
                    TranTime: "20:39",
                    productHold: 555,
                    productType: "赎回",
                },
                {
                    Balance: 2222,
                    productState:"成功",
                    Flag: "理财购买",
                    Account: "6217 **** **** 5876",
                    productName: "李木子",
                    productID: "0003",
                    TranDate01: "2017.05.10",
                    TranTime: "20:39",
                    productHold: 6,
                    productType: "购买",
                },
                {
                    Balance: 333,
                    productState:"失败",
                    Flag: "理财赎回",
                    Account: "6217 **** **** 5876",
                    productName: "李木子",
                    productID: "0004",
                    TranDate01: "2017.05.11",
                    TranTime: "20:39",
                    productHold: 4,
                    productType: "赎回",
                }
            ]
        }
}