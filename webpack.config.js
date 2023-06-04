const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
var path = require("path");
const options = { };

module.exports = {
	mode: "development", //"production"
	entry: {
		"primitives": "./src/index.js",
		"javascriptsamples": "./samples/javascript.controls/common/index.js",
		"pdfkitsamples": "./samples/pdfkit.plugins/index.js",
		"interactivetests": "./samples/javascript.controls/common/tests.js",
	},
    devServer: {
		static: './',
		hot: true,
		port: 8080
	},
	//devtool: 'eval-source-map',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
		library: "[name]",
		libraryTarget: "umd",
		publicPath: '/',
		globalObject: "this"
	},
    module: {
		rules: [
			{
				test: /\.css$/,
				use: [
				'style-loader',
				'css-loader',
				],
			},
			{
				test: /\.(svg|gif|png|eot|woff|ttf)$/,
				use: [
				'url-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
				},
			},
		],
	},
	resolve: {
        extensions: ['.js', '.scss'],
		fallback: {
			stream: require.resolve('stream-browserify'),
			util: require.resolve('util/')
		}
	},
		plugins: [
			new CleanWebpackPlugin(),
			// fix "process is not defined" error:
			new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
			// new HtmlWebPackPlugin({
			//   template: './*.html',
			//   filename: './*.html'
			// }),
			// new HtmlWebPackPlugin({
			//   template: './photos.html',
			//   filename: './photos.html'
			// })
	]
};
