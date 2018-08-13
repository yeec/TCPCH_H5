import 'core-js/fn/object/assign';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import $script from 'scriptjs';
import type from '../../../../../util/common/mobile-brower-type';
import 'lib-flexible';
//公共样式
import '../../../../../style/common.less';
//首页
import MbankFinanceCancle from "./index.jsx";

let dependencies = [];

//promise polyfill
if (!window.Promise) {
    dependencies.push('es6-promise.auto.min.js');
}
//fastclick solve 300ms in ios
if (type === 'ios') {
    dependencies.push('fastclick.1.0.6.min.js');
}


const runApp = function () {

    setTimeout(() => {
        ReactDOM.render((

                <MbankFinanceCancle />

        ), document.getElementById('root'));
    }, 50);
};

if (dependencies.length > 0) {
    $script.path('../static/polyfill/');
    $script(dependencies,function () {
        if (window.Fastclick) {
            window.FastClick.attach(document.body);
        }
        if (window.IntlPolyfill) {
            window.Intl = IntlPolyfill;
        }
       runApp();
    });
} else {
    runApp();
}