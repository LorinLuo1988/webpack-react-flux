/**
 * Created by doyen on 2015/12/25.
 */
require("node-jsx").install({extensions: ".jsx", harmony: true });

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');


new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	noInfo: false,
	historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
		if (err) {
			console.log(err);
		}
		console.log('Listening at localhost:3000');
	});