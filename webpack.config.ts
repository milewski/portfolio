import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';
import * as StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';
import * as dot from 'dotenv';
import * as path from 'path';
import { parseDomain } from "./helpers";

const context = path.resolve(__dirname, 'source')

dot.load({ path: '.env' });

const { NODE_ENV } = process.env

export default () => {

    return {
        context: context,
        entry: {
            'js/main': './typescript/Main.ts',
            'css/app': './sass/main.scss',

            'css/iframe-portfolio': './sass/iframe-portfolio.scss'
        },
        output: {
            publicPath: parseDomain(process.env),
            path: path.resolve(context, '..', 'public'),
            filename: '[name].js?[hash]'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        { loader: 'babel-loader' },
                        { loader: 'awesome-typescript-loader' },
                    ]
                },
                { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    loader: 'file-loader',
                    include: /fonts/,
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                },

                // {
                //     test: /\.pdf$/,
                //     loader: 'file-loader',
                //     options: {
                //         name: 'pdf/[name].[ext]'
                //     }
                // },

                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', options: { minimize: true, importLoaders: 1 } },
                            { loader: 'postcss-loader', options: require('./postscss').options },
                            { loader: 'resolve-url-loader' },
                            { loader: 'sass-loader', options: { sourceMap: true } }
                        ]
                    })
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    exclude: [/fonts/, /pdf/],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        },
                        {
                            loader: 'imagemin-loader',
                            options: {
                                plugins: [
                                    {
                                        use: require('imagemin-jpegtran'),
                                        options: {
                                            enabled: NODE_ENV === 'production'
                                        }
                                    },
                                    {
                                        use: require('imagemin-pngquant'),
                                        options: {
                                            enabled: NODE_ENV === 'production',
                                            quality: '40-50',
                                            speed: 4
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                },
                {
                    // test: /pdf?.*\.(jpg|png)$/,
                    test: /\.pdf$/,
                    use: [
                        // {
                        //     loader: 'file-loader',
                        //     options: {
                        //         name: '[path]/[name]-small.[ext]?[hash]'
                        //     }
                        // },
                        {
                            loader: 'bin-exec-loader',
                            options: {
                                binary: 'convert',
                                prefix: '-',
                                export: true,
                                emitFile: /\.jpg$/,
                                multiple: true,
                                name: 'images/pdf/[name].jpg',
                                args: {
                                    $1: '[input]',
                                    // resize: '[resize]',
                                    // resize: '50%',
                                    $2: '[output]'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.handlebars$/,
                    loader: 'handlebars-loader',
                    options: {
                        inlineRequires: /(images)/,
                        helperDirs: [path.resolve(context, 'views/helpers')],
                        partialDirs: [path.resolve(context, 'views/partials')]
                    }
                }

            ]
        },
        plugins: [
            new CleanWebpackPlugin(['public'], {
                root: path.resolve(context, '..'),
                verbose: true,
                dry: false,
                exclude: ['humans.txt', 'robots.txt', 'browserconfig.xml']
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'views/index.handlebars',
                language: 'english',
                favicon: './images/favicon.ico',
                env: process.env,
                excludeAssets: [/css\/?.*\.js?\?.*/]
            }),
            new HtmlWebpackPlugin({
                filename: 'pt/index.html',
                template: 'views/index.handlebars',
                language: 'portuguese',
                favicon: './images/favicon.ico',
                env: process.env,
                excludeAssets: [/css\/?.*\.js?\?.*/]
            }),

            //** Portfolio
            // new HtmlWebpackPlugin({
            //     filename: 'portfolio/inspire.html',
            //     template: 'views/portfolio/inspire.handlebars',
            //     favicon: './images/favicon.ico',
            //     chunks: ['css/iframe-portfolio'],
            //     env: process.env,
            //     excludeAssets: [/css\/?.*\.js?\?.*/]
            // }),

            new HtmlWebpackExcludeAssetsPlugin(),
            new ExtractTextPlugin({
                filename: '[name].css?[contenthash]',
                allChunks: true
            }),
            new webpack.optimize.UglifyJsPlugin(),
            new StyleExtHtmlWebpackPlugin({
                cssRegExp: /css\/?.*\.css?\?.*/,
                chunks: ['css/iframe-portfolio']
            }),
        ]
    }
}
