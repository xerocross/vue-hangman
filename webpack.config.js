const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
module.exports = {
    entry : {
        'index' : './src/index.js'
    },
    output : {
        path : path.resolve(__dirname, './dist'),
        publicPath : '/dist',
        filename : '[name].js',
    },
    externals : {
        vue : "Vue",
        jquery : "$"
        // remove this line if you want 
        // to bundle vue with the script
    },
    module : {
        rules : [
            {
                test : /\.vue$/,
                exclude : /node_modules/,
                loader : 'vue-loader'
            },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            },
            {
                test : /\.scss$/,
                use : [
                    {
                        loader : 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader : 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader : 'sass-loader' // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    optimization : {
        minimize : false
    },
    plugins : [
        new webpack.DefinePlugin({
            "env" : JSON.stringify({
                "NODE_ENV" : process.env.NODE_ENV
            })
        }),
        new VueLoaderPlugin()
    ],
    devServer : {
        contentBase : "./public",
        compress : true,
        port : 9000,
        watchContentBase : true
    }
}