const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = (ext) => {
    return isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
}

const getLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
        clean: true
    },
    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: getLoaders()
            }
        ]
    }
}
