const agent = require('./util/agent');
const tool = require('./util/tool');

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
