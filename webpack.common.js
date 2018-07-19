const path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
const cleanWebpackPlugin=require("clean-webpack-plugin");

module.exports={
    //单入口
    //entry:"./src/main.js",
    //多入口
    entry:{
        main:'./src/js/main.js',
        app:'./src/js/app.js'
    },
    output:{
        filename:'[name].[hash:4].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',//将ES6转为ES5供浏览器使用
                    options:{
                        presets:['env']
                    }
                }
            },
            // {
            //     test:/\.css$/,
            //     use:[
            //         miniCssExtractPlugin.loader,
            //         'css-loader'
            //     ]
            // },
            {
                test:/\.{png|jpe?g|gif|svg}$/,
                // loader: 'url-loader?limit=8192&name=./img/[name].[ext]?[hash]',
                loader:'url-loader',
                options:{
                    limit:8000, //表明当图片大于于8000时，正常打包，小于8000时，以Base64的方式引用
                    //outputPath: './img/',
                    name: '[name].[ext]?[hash]',
                    useRelativePath:true
                }
            }

           
           
        ]
    },
    plugins:[
        new cleanWebpackPlugin(['dist']),//用来清理输出目录，在构建之前使用它来清理之前的输出目录，这样有助于保持输出目录的结构清晰
        new htmlWebpackPlugin({//该插件会在/dist中新生成一个index.html,并且会将所有的bundle自动添加到新的index.html中
            //title:'Output management' //这种方式直接生成index.html，不用定义模板
            template:__dirname+"/src/index.tmpl.html"
        }),
       
    ]

    //loader与plugins的差别：loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。
}