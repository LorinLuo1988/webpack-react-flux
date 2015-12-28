/**
 * Created by doyen on 2015/12/28.
 */
/*---------------module--------------*/
var path = require("path");
var fs = require("fs");
var webpack = require("webpack");

/*----------------dir----------------*/
var nodeModulesDir = path.resolve(__dirname, "node_modules");
var reactDir = path.resolve(nodeModulesDir, "react/react.js");
var reactDomDir = path.resolve(nodeModulesDir, "react-dom/dist/react-dom.js");

/*---------------plugin--------------*/
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
	mangle: {
		except: ["$super", "$", "exports", "require", "React", "ReactDOM"]
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
			path.resolve(__dirname, "src", "app/home.jsx")
		],
		introduce: [
			path.resolve(__dirname, "src", "app/introduce.jsx")
		]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
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
			filename: "home.html",
			//template: path.resolve(__dirname, "src", "home.html"),
			templateContent: function () {
				var webpackDevServerHtml = '<script src="http://localhost:3000/webpack-dev-server.js"></script>';
				var html = fs.readFileSync(path.resolve(__dirname, "src", "home.html"), "utf8");
				return html.replace("webpackDevServerHtml", "");
			},
			inject: "body",
			title: "home",
			chunks: ["common", "home"]
		}),
		new HtmlWebpackPlugin({
			filename: "introduce.html",
			//template: path.resolve(__dirname, "src", "introduce.html"),
			templateContent: function () {
				var webpackDevServerHtml = '<script src="http://localhost:3000/webpack-dev-server.js"></script>';
				var html = fs.readFileSync(path.resolve(__dirname, "src", "introduce.html"), "utf8");
				return html.replace("webpackDevServerHtml", "");
			},
			inject: "body",
			title: "introduce",
			chunks: ["common", "introduce"]
		}),
		uglifyPlugin
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader?" + JSON.stringify(babelQuery),
				exclude: nodeModulesDir
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize?sourceMap!less-loader")
			}
		],
		noParse: [reactDomDir]
	},
	resolve: {
		root: path.resolve(__dirname, "src", "app"),
		extensions: ["", ".js", ".jsx", ".css", ".less"],
		alias: {
			homeCss: path.resolve(__dirname, "src", "style/home.less")
		}
	}
};

module.exports = config;