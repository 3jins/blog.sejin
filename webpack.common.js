const path = require("path");

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, 'client', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: {
            index: path.resolve(__dirname, 'public'),
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
                    presets: ['react', 'env']
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