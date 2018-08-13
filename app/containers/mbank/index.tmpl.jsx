
import 'core-js/fn/object/assign';
import 'whatwg-fetch';

import React from 'react';
// 获取 store
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router'
import RouteMap from '../../router/MbankRouteMap'
import $script from 'scriptjs';
import type from './../../util/common/mobile-brower-type';
import 'lib-flexible';
import '../../style/common.less';


let dependencies = [];

//promise polyfill
if (!window.Promise) {
    dependencies.push('es6-promise.auto.min.js');
}
//fastclick solve 300ms in ios
if (type === 'ios') {
    dependencies.push('fastclick.1.0.6.min.js');
}

// if (!window.Intl) {
//     dependencies.push('Intl.min.js');
// }


const runApp = function () {

    setTimeout(() => {
        ReactDOM.render((

                <RouteMap history={hashHistory}/>

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
        //alert(window.devicePixelRatio);
        runApp();
    });
} else {
    runApp();
}


