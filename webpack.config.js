var webpack = require("webpack");
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        // app:'./src/js/app.jsx',
        // calendar:'./src/js/calendar.jsx',
        index:'./src/locator.jsx'
    },

    output: {
        path: './build',
        publicPath:"",
        filename: 'js/[name].js',
        chunkFilename: "js/[chunkhash:8].[name].js"
    },
     devtool: 'source-map',
    //enable dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        host:'0.0.0.0',
        inline: true,
        progress: true
    },
    module: {
        noParse:[/extlibs/],
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.html$/,
            loader: "html?-minimize"
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url?limit=81920&name=images/[hash:8].[name].[ext]'
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }]
    },
    resolve: {
        // root: [path.resolve('./src/js')],
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        'react': 'React',
        'jquery': '$',
        'jQuery': '$' 
    },
    plugins:[
       /* new HtmlwebpackPlugin({
            title: '搜索页',
            filename: '/search.aspx', //生成的html存放路径，相对于 path
            template: './src/_layouts.html', //html模板路径
            inject: true, //允许插件修改哪些内容，inject: true, 包括head与body   inject: head, 只到head
            hash: true, //为静态资源生成hash值
            chunks: ["app","common"]
        }),
        new HtmlwebpackPlugin({
            title: '工作日',
            filename: '/holidays.aspx', //生成的html存放路径，相对于 path
            template: './src/_layouts.html', //html模板路径
            inject: true, //允许插件修改哪些内容，inject: true, 包括head与body   inject: head, 只到head
            hash: true, //为静态资源生成hash值
            chunks: ["calendar","common"]
        }),*/
        new HtmlwebpackPlugin({
            title: 'SOPS',
            filename: '/index.aspx', //生成的html存放路径，相对于 path
            template: './src/_layouts.html', //html模板路径
            inject: true, //允许插件修改哪些内容，inject: true, 包括head与body   inject: head, 只到head
            hash: true, //为静态资源生成hash值
            chunks: ["index","common"]
        }),
        new ExtractTextPlugin("css/[name].css", {
            publicPath: 'css/',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common'],
            filename: "js/[name].js",
            minChunks: Infinity
        })
    ]
};