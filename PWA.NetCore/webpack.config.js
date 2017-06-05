const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);


    const vendorConfig = {
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) },
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ]
        },

        entry: {
            vendor: [
                'jquery',
                'bootstrap/dist/js/bootstrap',
                'bootstrap/dist/css/bootstrap.css'
            ]
        },

        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            filename: "[name].bundle.js",
        },

        plugins: [
            extractCSS,
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new CopyWebpackPlugin([
            { from: './Content/sw.js', to: path.join(__dirname, 'wwwroot')  },
            ])
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }

    const appConfig = {

        entry: {
            app:['./Content/js/app.js'],
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            filename: "[name].bundle.js",
            libraryTarget: 'var',
            library: 'ui'
        },
    };

    return [vendorConfig, appConfig];
};