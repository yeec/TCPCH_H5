var fs = require('fs');
var path = require('path')
var entryPath = path.join(__dirname, './config');

var entryList = {};
fs.readdirSync(entryPath).forEach(function (file) {
    var entryFile = require("./config/" + file)
    for (i in entryFile) {
        entryList[i] = entryFile[i];
    }
})

// //全部打包
     module.exports = entryList;
 //单个打包
    //    module.exports = {
    //     'transfer-businessConfirm': ['./app/containers/mbank/MbankTransfer/transfer-business/transfer-businessConfirm/index.tmpl.jsx'],
    //     'transfer-query': ['./app/containers/mbank/MbankTransfer/transfer-query/index.tmpl.jsx'],
    //     'transfer-revoke': ['./app/containers/mbank/MbankTransfer/transfer-revoke/index.tmpl.jsx'],
    // };