const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
    mode: "none",
    entry: {
        'app_deep_link': './src/index.js',
        'app_deep_link.min': './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'AppDeepLink',
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                include: /\.min\.js$/
            })
        ]
    }
};
