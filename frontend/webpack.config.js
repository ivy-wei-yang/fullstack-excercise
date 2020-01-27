require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.join(__dirname, './');
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: '/',
    },

    mode: "development",

    devtool: "source-map",

    resolve: {
        modules: ["node_modules", "src"],
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
	},
	plugins: [
		new HtmlWebpackPlugin({
            title: 'Customer Info App',
            template: path.join(root, 'index.html'),
        }),
		new webpack.DefinePlugin({
			"process.env.SERVICE_URL": JSON.stringify(process.env.SERVICE_URL)
		})
    ],
    devServer: {
        historyApiFallback: true,
        host: "0.0.0.0",
    },	
};
