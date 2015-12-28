/**
 * Created by doyen on 2015/12/23.
 */
/*---------------module--------------*/
var path = require("path");
var webpack = require("webpack");

/*----------------dir----------------*/
var nodeModulesDir = path.resolve(__dirname, "node_modules");
var reactDir = path.resolve(nodeModulesDir, "react/react.js");
var reactDomDir = path.resolve(nodeModulesDir, "react-dom/dist/react-dom.js");

/*---------------plugin--------------*/
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
	mangle: {
		except: ["$super", "$", "exports", "require", "React", "ReactDOM"] //这些变量名不会被混淆
	},
	compress: {
		warnings: false
	}
});
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");

/*---ordinal variable---*/
var babelQuery = {presets: ["es2015", "react"]};

/*---------------config--------------*/
var config = {
	entry: {
		home: [
			'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, "src", "app/home.jsx")
		],
		introduce: [
			'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, "src", "app/introduce.jsx")
		]
	},
	output: {
		path: path.resolve(__dirname, "build"), //打包输出的路径
		publicPath: "http://localhost:3000/",  //加载静态资源的路径
		filename: "[name].bundle.js"
	},
	plugins: [
		new CommonsChunkPlugin({
			name: "common",
			filename: "common.js",
			chunks: ["home", "introduce"]
		}),
		new ExtractTextPlugin("[name].css", {allChunks: true}),
		new HtmlWebpackPlugin({
			filename: "home.html", //输出html
			template: path.resolve(__dirname, "src", "home.html"),  //模板html
			inject: "body", //将js文件插入该元素,
			//templateContent: '<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8"><title></title> </head> <body> <div id="index"></div> </body> </html>',
			/*---templateContent: 自己定义的html字符串，不能发和template同时存在---*/
			title: "home",
			chunks: ["common", "home"]
		}),
		new HtmlWebpackPlugin({
			filename: "introduce.html",
			template: path.resolve(__dirname, "src", "introduce.html"),
			inject: "body",
			title: "introduce",
			chunks: ["common", "introduce"]
		}),
		new webpack.HotModuleReplacementPlugin(),
		uglifyPlugin
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "react-hot!babel-loader?" + JSON.stringify(babelQuery),
				exclude: path.resolve(__dirname, "node_modules") //这些文件不会被loader起作用(一般是第三方插件)
				//query: {
				//	presets: ["es2015", "react"]
				//}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize?sourceMap")
				//loaders: ["style-loader", "css-loader"]
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize?sourceMap!less-loader")
				//loaders: ["style-loader", "css-loader"]
			}
		],
		noParse: [reactDomDir] //不会去检查这些文件里面是否有依赖(一般是第三方插件)
	},
	resolve: {
		root: path.resolve(__dirname, "app"),
		extensions: ["", ".js", ".jsx", ".css", ".less"],
		alias: {
			homeCss: path.resolve(__dirname, "src", "style/home.less")
		}
	},
	devtool: 'source-map'
};

module.exports = config;