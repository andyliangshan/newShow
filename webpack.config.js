var webpack = require('webpack');
var glob = require('glob')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var isDebug = !process.argv.includes('--release');
var cdn = isDebug ? '' : '';
//路径是相对于package.json所在路径
var entry_map = {
    'index': './public/javascripts/index.js',
};
var pages = {};
glob.sync('./views/**/*.html').forEach(function (entry) {
    var basename = path.basename(entry, path.extname(entry));
    pages[basename] = entry;
    console.log(basename, entry, '=============');
});

var webpackConfig = {
    entry: entry_map,
    devtool: 'source-map',
    output: {
        path: path.resolve(process.cwd(), 'dist/'),
        //[name]-[hash].js可以指定hash值。
        filename: '[name][hash].js',
        publicPath: `${cdn}/dist/js/`,
    },
    plugins: [
        // new ExtractTextPlugin("[name][hash].css"),
        new ExtractTextPlugin({
            filename: path.posix.join('static', 'css/[name]-extract.[contenthash].css')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            __CDN__: isDebug ? '""' : '" "',
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)|(global\/lib\/)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader')
            },
            {
                test: /\.scss$/,
                //!代表先执行 ？是传递给loader的参数，?sourceMap表示使用sourceMap， js使用sourcemap通过devtool: sourcemap来指定。
                loader: ExtractTextPlugin.extract('style-loader','css-loader?sourceMap&-convertValues!sass-loader?sourceMap')
            },
            { //解析 .html
                test: /\.html$/,
                loader: 'html-loader'
            },
        ]
    }
};

for (var pathname in pages) {
    console.log(pathname, '--------');
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname],
        inject: true,
        chunks: [pathname],
    };
    if (pathname in webpackConfig.entry) {
        conf.chunks = ['vendor', pathname];
        conf.hash = true;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = webpackConfig;
