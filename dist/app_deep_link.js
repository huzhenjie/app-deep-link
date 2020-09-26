(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AppDeepLink"] = factory();
	else
		root["AppDeepLink"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const agent = __webpack_require__(1);
const tool = __webpack_require__(2);

const browserGuideTpl = '<div style=\'position:fixed;left:0;top:0;background:rgba(0,0,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;\'><div style=\'text-align:right;margin-top:1%;margin-right:5%;\'><img style=\'width:70%; margin:0 auto;\' src=\'https://res.zijizhang.com/img/android-brower-tip.png\'/></div></div>';
const platformUnSupportMsg = 'Do not support this platform';

const err = (errorHandler, msg) => {
    if (errorHandler) {
        return errorHandler(msg)
    }
    throw msg
};

const wakeUpOrInstallIos = (ios, onError) => {
    if (!ios) {
        return err(onError, platformUnSupportMsg)
    }
    const {ulink, scheme, downloadUrl} = ios;
    if (ulink) {
        return tool.loc(ulink)
    }
    let delayTs = 100;
    if (scheme) {
        delayTs = 2000;

        if (agent.isWechat) {
            tool.createEl(browserGuideTpl);
            return
        }

        tool.loc(scheme);
        // if (downloadUrl) {
        //     const openTs = +new Date();
        //     let timer = setTimeout(() => {
        //         const now = +new Date();
        //         if (now - openTs < 2200) {
        //             tool.loc(downloadUrl);
        //         }
        //         clearTimeout(timer)
        //     }, 2000);
        // }
        // return;
    }
    if (downloadUrl) {
        if (!/itms-app|apps.apple.com/.test(downloadUrl)) {
            tool.createEl(browserGuideTpl);
            return
        }

        tool.delayRun(() => {
            tool.loc(downloadUrl)
        }, delayTs)
    }
};

const wakeUpOrInstallAndroid = (android, onError) => {
    if (!android) {
        return err(onError, platformUnSupportMsg)
    }

    const {scheme, downloadUrl} = android;

    if (!scheme && !downloadUrl) {
        return
    }

    if (agent.isWechat) {
        if (scheme || (downloadUrl && !/app.qq.com/.test(downloadUrl))) {
            tool.createEl(browserGuideTpl);
            return
        }
    }

    if (downloadUrl) {
        let delayTs = agent.isMiui ? 1000 : 300;
        tool.delayRun(() => {
            tool.loc(downloadUrl)
        }, delayTs)
    }

    if (scheme) {
        tool.elClick(scheme);
    }
};

const wakeUpOrInstall = (param) => {
    const {android, ios, onError} = param || {};
    if (agent.isIOS) {
        return wakeUpOrInstallIos(ios, onError)
    }
    if (agent.isAndroid) {
        return wakeUpOrInstallAndroid(android, onError)
    }
    err(onError, platformUnSupportMsg);
};

module.exports = {
    wakeUpOrInstall
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const UA = window.navigator.userAgent.toLowerCase();

module.exports = {
    UA,
    isAndroid: UA && /android|miui/.test(UA),
    isIOS: UA && /iphone|ipad|ipod|ios/.test(UA),
    isPC: UA && !exports.isAndroid && !exports.isIOS,
    isMiui: UA && /miui/.test(UA),
    isAlipay: UA && /alipayclient/.test(UA),
    isWechat: UA && /(micromessenger)/.test(UA),
    isWeibo: UA && /weibo/.test(UA),
    isQQ: UA && /qq\/([\d\\.]+)*/.test(UA),
    isFacebook: UA && /fban|fbav/.test(UA),
    isInstagram: UA && /instagram/.test(UA),
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const elClick = (url) => {
    const el = document.createElement("a");
    el.style.display = "none";
    el.href = url;
    document.body.appendChild(el);
    el.click()
};

const frm = (url) => {
    const el = document.createElement("iframe");
    el.style.display = "none";
    el.style.visibility = "hidden";
    el.src = url;
    document.body.appendChild(el)
};

const loc = (url) => {
    window.location.href = url
};

const open = (url) => {
    window.open(url)
};

const delayRun = (callback, timeout) => {
    let r, i;
    void 0 !== document.hidden
        ? (r = "hidden", i = "visibilitychange")
        : void 0 !== document.msHidden
        ? (r = "msHidden", i = "msvisibilitychange")
        : void 0 !== document.webkitHidden && (r = "webkitHidden", i = "webkitvisibilitychange");
    let timeoutTask = setTimeout(() => {
        null == timeoutTask || document[r] || (callback(), timeoutTask = null)
    }, timeout);
    let logic = () => {
        null != timeoutTask && document[r] && (clearTimeout(timeoutTask), timeoutTask = null, document.removeEventListener(i, logic))
    };
    i && document.addEventListener(i, logic, !1)
};

const createEl = (elStr) => {
    let el = document.createElement('div');
    el.innerHTML = elStr;
    let currEl = el.children[0];
    const evt = () => {
        document.body.removeChild(el);
    };
    if (currEl.addEventListener) {
        currEl.addEventListener('click', evt);
    } else {
        currEl.onclick = evt;
    }
    document.body.appendChild(el)
};

module.exports = {
    elClick,
    frm,
    loc,
    open,
    delayRun,
    createEl
};


/***/ })
/******/ ]);
});