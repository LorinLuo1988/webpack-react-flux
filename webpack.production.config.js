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
var babelQuery = {presets: ["es2015", "react"], };

/*---------------config--------------*/
var config = {
	entry: {
		home: [
			path.resolve(__dirname, "src", "app/home.jsx")
		],
		introduce: [
			path.resolve(__dirname, "src", "app/introduce.jsx")
		],
		todos: [
			path.resolve(__dirname, "src", "app/todos.jsx")
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
			chunks: ["home", "introduce", "todos"]
		}),
		new ExtractTextPlugin("[name].css", {allChunks: true}),
		new HtmlWebpackPlugin({
			filename: "home.html",
			//template: path.resolve(__dirname, "src", "home.html"),
			templateContent: function () {
				var webpackDevServerHtml = '<script src="http://localhost:3000/webpack-dev-server.js"></script>';
				var html = fs.readFileSync(path.resolve(__dirname, "src", "home.html"), "utf8");
				return html.replace(webpackDevServerHtml, "");
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
				return html.replace(webpackDevServerHtml, "");
			},
			inject: "body",
			title: "introduce",
			chunks: ["common", "introduce"]
		}),
		new HtmlWebpackPlugin({
			filename: "todos.html",
			//template: path.resolve(__dirname, "src", "introduce.html"),
			templateContent: function () {
				var webpackDevServerHtml = '<script src="http://localhost:3000/webpack-dev-server.js"></script>';
				var html = fs.readFileSync(path.resolve(__dirname, "src", "todos.html"), "utf8");
				return html.replace(webpackDevServerHtml, "");
			},
			inject: "body",
			title: "todos",
			chunks: ["common", "todos"]
		})
		//uglifyPlugin
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader?" + JSON.stringify(babelQuery),
				exclude: nodeModulesDir
			},
			{
				test: reactDir,
				loader: "expose?React"
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize?sourceMap!less-loader")
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize?sourceMap!sass-loader")
			},
			{
				test: /\.(png|jpg)$/,
				loader: "url-loader",
				query: {
					limit: 2500000
				}
			}
		],
		noParse: [reactDomDir]
	},
	resolve: {
		root: path.resolve(__dirname, "src", "app"),
		extensions: ["", ".js", ".jsx", ".css", ".less"],
		alias: {
			homeSass: path.resolve(__dirname, "src", "sass/home.scss")
		}
	}
};

module.exports = config;





