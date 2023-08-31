<h1 align="center">App deep link for Android and iOS</h1>

[![https://img.shields.io/npm/v/app-deep-link/latest.svg](https://img.shields.io/npm/v/app-deep-link/latest.svg)](https://www.npmjs.com/package/app-deep-link)
[![https://img.shields.io/badge/%24-donate-ff69b4.svg](https://img.shields.io/badge/%24-donate-ff69b4.svg)](https://github.com/huzhenjie/app-deep-link#donate)

<h2>Introduction</h2>

When a clicked link or programmatic request invokes a web URI intent, the mobile system tries open the only available app that can handle the URI. If open the app fails, navigate to download it.

You needn't consider what platform is Android or iOS. You don't even need to consider what browser it is.

Call the only method `AppDeepLink.wakeUpOrInstall` when you want to wake up your app or install it in your js.

（当点击链接时，如果已经安装了app，尝试调起app，如果没有安装app，跳转到下载）

<h2>Getting started</h2>

<h3>1. npm</h3>

<h4>Install dependency</h4>

```
$ npm install -S app-deep-link
```

<h4>Basic Useage</h4>

```
const AppDeepLink = require('AppDeepLink');

...
AppDeepLink.wakeUpOrInstall({
    ios: {
        ulink: 'https://your.universal.link',

        scheme: 'yourscheme://your.scheme',

        downloadUrl: 'https://your.download.url'
        // itms-apps://itunes.apple.com/app/id
        // itms-appss://apps.apple.com/app/id
        // https://apps.apple.com/app/id
        // https://baidu.com/app.plist
    },
    android: {
        scheme: 'yourscheme://your.scheme', 

        downloadUrl: 'https://baidu.com/your_app.apk'
    }
});
...
```

<h3>2. script</h3>

<h4>Add dependency</h4>

```
<script src="../dist/app_deep_link.js"></script>
```

<h4>Basic Useage</h4>

```
...

AppDeepLink.wakeUpOrInstall({
    ios: {
        ulink: 'https://your.universal.link',

        scheme: 'yourscheme://your.scheme',

        downloadUrl: 'https://your.download.url'
        // itms-apps://itunes.apple.com/app/id
        // itms-appss://apps.apple.com/app/id
        // https://apps.apple.com/app/id
        // https://baidu.com/app.plist
    },
    android: {
        scheme: 'yourscheme://your.scheme', 

        downloadUrl: 'https://baidu.com/your_app.apk'
    }
});
...
```

<h2>Build</h2>

```
$ npm run build
```

<h2>Donate</h2>

If you find this project useful, you can buy anthor a glass of juice. Thank you.

![Donate](https://res.zijizhang.com/img/20200927/huzhenjie_pay_qr.jpg)

[Paypal Me](https://www.paypal.com/paypalme/hzjpay)

<h2>Questions</h2>

For help and support questions, please mail to me. (huzhenjie.dev@gmail.com)
