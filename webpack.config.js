module.exports = {
    entry: ["babel-polyfill", "whatwg-fetch", __dirname + "/client/index.js"],
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback: {
            index: __dirname + "/public/"
        }
    },
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'env']
                }
            },
            {
                test: /\.sass$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.png$|\.jpg$|\.gif$|\.ttf$|\.eot$|\.woff$|\.woff2$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
};