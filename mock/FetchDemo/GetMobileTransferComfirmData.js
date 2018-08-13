module.exports = {
  TCD:{
        money: '1000.00',
        accountOutNum: "23445555555999",
        accountOutName: "周菲菲",
        accountInNum: "6666666655555551",
        accountInName: "李婷婷",
        transferType: "手机号转账",
        dealPs: "货款货款",
        confirmType:[{
            titles: '短信',
            contents: "转账限额：单笔5万元，日累计5万元",
            currents: "1",
            phonenum: "18730262988",
            usable: "1"
          }, 
          {
            titles: '手机证书',
            contents: "转账限额：单笔10万元，日累计30万元",
            currents: "0",
            phonenum: "15910779653",
            usable: "0"
          }, 
          {
            titles: '电子令牌',
            contents: "转账限额：单笔50万元，日累计120万元",
            currents: "0",
            usable: "0"
          }
        ]
    }
}