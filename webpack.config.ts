import * as path from 'path';
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as dot from "dotenv";
import * as url from "url";

import * as HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';

const context = path.resolve(__dirname, 'source')

dot.load({ path: '.env' });

export default env => {

    return {
        context: context,
        entry: {
            'js/main': './typescript/Main.ts',
            'css/app': './sass/main.scss',
        },
        output: {
            publicPath: url.format(process.env.DOMAIN),
            path: path.resolve(context, '..', 'distribution'),
            filename: '[name].js?[hash]'
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: 'awesome-typescript-loader' },

                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    loader: 'file-loader',
                    include: /fonts/,
                    query: {
                        name: 'fonts/[name].[ext]'
                    }
                },

                {
                    test: /\.pdf$/,
                    loader: 'file-loader',
                    query: {
                        name: 'pdf/[name].[ext]'
                    }
                },

                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', options: { minimize: true, importLoaders: 1 } },
                            { loader: 'postcss-loader', options: require('./postscss').options },
                            { loader: 'resolve-url-loader' },
                            { loader: 'sass-loader', query: { sourceMap: true } }
                        ]
                    })
                },

                {
                    test: /\.(jpg|png|svg)$/,
                    exclude: /fonts/,
                    use: [
                        {
                            loader: 'file-loader',
                            query: {
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
                                            enabled: env === 'production'
                                        }
                                    },
                                    {
                                        use: require('imagemin-pngquant'),
                                        options: {
                                            enabled: env === 'production',
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
                    test: /\.handlebars$/,
                    loader: 'handlebars-loader',
                    query: {
                        inlineRequires: '/(images)/',
                        helperDirs: [path.resolve(context, 'views/helpers')],
                        partialDirs: [path.resolve(context, 'views/partials')]
                    }
                }

            ]
        },
        plugins: [
            new CleanWebpackPlugin(['distribution'], {
                root: path.resolve(context, '..'),
                verbose: true,
                dry: false,
                exclude: ['humans.txt', 'robots.txt']
            }),
            new HtmlWebpackPlugin({
                template: 'views/index.handlebars',
                language: 'english',
                env: process.env,
                excludeAssets: [/css\/?.*\.js?\?.*/],
                minify: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackExcludeAssetsPlugin(),
            new ExtractTextPlugin({
                filename: '[name].css?[contenthash]',
                allChunks: true
            })
        ]
    }
}
