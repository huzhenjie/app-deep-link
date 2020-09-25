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
