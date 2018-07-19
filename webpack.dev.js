const merge=require("webpack-merge");//用于将两个模块合并
const common=require("./webpack.common.js");
const webpack=require("webpack");
const htmlWebpackPlugin=require("html-webpack-plugin");

module.exports=merge(common,{
    devtool:"#@cheap-module-eval-source-map",//用于生成source map，有助于我们准确定位的错误来源文件
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                loader:'style-loader!css-loader!sass-loader'
            }
        ]
    },
    devServer:{//一个简单的web服务器，基于Node.js构建的，并且能够实时重新加载
        contentBase:'./dist',//默认为根文件
        port:8080,//设置监听端口，如果省略，默认为8080
        inline:true,//当源代码改变时会自动刷新页面
        historyApiFallback:true,//在开发单页面时非常有用，当设置为true时，所有的跳转将指向index.html
        open:true,
        hot:true

    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//热加载插件，
    ]
})

//chunk