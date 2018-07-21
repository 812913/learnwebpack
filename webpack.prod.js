const webpack=require("webpack");
const common=require("./webpack.common.js");
const merge=require("webpack-merge");
const uglifyjsPlugin=require("uglifyjs-webpack-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const miniCssExtractPlugin=require("mini-css-extract-plugin");
const cleanWebpackPlugin=require("clean-webpack-plugin");


module.exports=merge(common,{
    devtool:"#@cheap-module-source-map",
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    miniCssExtractPlugin.loader,//不再使用style-loader
                    'css-loader',
                    'sass-loader'
                ]
            },

            //ExtractTextPlugin.extract(options:loader|object)中object的三个参数的意义：
            //use:指明用什么loader去编译文件
            //fallback:编译后用什么loader来提取css文件
            //publicPath:用来覆盖项目路径，生成该css文件的文件路径
            // {
            //     test:/\.css$/,
            //     use:ExtractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:['css-loader','post-loader']
            //     })
            // },
            // {
            //     test:/\.less$/,
            //     use:ExtractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:['css-loader','less-loader']
            //     })
            // },
            // {
            //     test:/\.scss$/,
            //     use:ExtractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:['css-loader','sass-loader']
            //     })
            // }

            // {
            //     test:/\.css$/,
            //     use:[
            //         {
            //             loader:'style-loader'//将计算后的样式加入页面中
            //         },
            //         {
            //             loader:'css-loader',// 使用类似@import和url(...)实现require的功能
            //         },
            //         {
            //             loader:"postcss-loader",
            //             options:{
            //                 plugins:function(){
            //                     require('postcss-import')(),
            //                     require("autoprefixer")({
            //                         "browsers": ["Android >= 4.1", "iOS >= 7.0", "ie >= 8"]
            //                     })
            //                 }
            //             }
            //         }
            //     ]
            // },
        ]
    },
    
     

    plugins:[
        // new uglifyjsPlugin({//默认就是压缩过的，用于删除未引用的代码，从而压缩
        //     sourceMap:true
        // }),
        // new webpack.DefinePlugin({//默认是production，不用指定
        //     'process.env.NODE_ENV':JSON.stringify('production')
        // }),
        new webpack.BannerPlugin("版本所有，翻版必究"),
         //new ExtractTextPlugin('./dist/style.css')
         new miniCssExtractPlugin({
            filename:'./css/[name].[hash:4].css',
        }),
        new cleanWebpackPlugin(['dist']),//用来清理输出目录，在构建之前使用它来清理之前的输出目录，这样有助于保持输出目录的结构清晰

    ]
})