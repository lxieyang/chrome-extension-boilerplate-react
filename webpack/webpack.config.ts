import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fileSystem from 'fs-extra';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import packageJson from '../package.json';
import { NODE_ENV, PORT } from './env';

// MJS compatibility with CJS globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(__filename);

const PROJECT_ROOT = path.join(__dirname, '..');
const OUT_DIR = path.resolve(PROJECT_ROOT, 'build');
const IS_DEV_MODE = NODE_ENV !== 'production';
const FILE_EXTS = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'eot',
    'otf',
    'svg',
    'ttf',
    'woff',
    'woff2'
];

// Loading env secrets
const alias: Record<string, string> = {};
const secretResolutionOrder = ['.ts', '.mts', '.cts', '.js', '.mjs', '.cjs'];

for (const ext of secretResolutionOrder) {
    const secretsPath = path.join(PROJECT_ROOT, `secrets.${NODE_ENV}${ext}`);

    if (fileSystem.existsSync(secretsPath)) {
        alias.secrets = secretsPath;
        break;
    }
}

// Exported config must not be mutable
const config: webpack.Configuration = {
    mode: IS_DEV_MODE ? 'development' : 'production',
    devtool: IS_DEV_MODE ? 'cheap-module-source-map' : undefined,
    optimization: IS_DEV_MODE
        ? undefined
        : {
              minimize: true,
              minimizer: [
                  new TerserPlugin({
                      extractComments: false
                  })
              ]
          },
    entry: {
        // Should fix #8
        hmr: `webpack-dev-server/client?http://localhost:${PORT}`,
        // react_hmr: 'react-hot-loader/patch',

        newtab: path.join(PROJECT_ROOT, 'src', 'pages', 'Newtab', 'index.tsx'),
        options: path.join(
            PROJECT_ROOT,
            'src',
            'pages',
            'Options',
            'index.tsx'
        ),
        popup: path.join(PROJECT_ROOT, 'src', 'pages', 'Popup', 'index.tsx'),
        background: path.join(
            PROJECT_ROOT,
            'src',
            'pages',
            'Background',
            'index.ts'
        ),
        devtools: path.join(
            PROJECT_ROOT,
            'src',
            'pages',
            'Devtools',
            'index.ts'
        ),
        panel: path.join(PROJECT_ROOT, 'src', 'pages', 'Panel', 'index.tsx'),
        contentScript: path.join(
            PROJECT_ROOT,
            'src',
            'pages',
            'Content',
            'index.ts'
        )
    },
    output: {
        filename: '[name].bundle.js',
        path: OUT_DIR,
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                // look for .css or .scss files in the `src` directory
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: new RegExp('.(' + FILE_EXTS.join('|') + ')$'),
                type: 'asset/resource',
                exclude: /node_modules/
                // loader: 'file-loader',
                // options: {
                //   name: '[name].[ext]',
                // },
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            },
            {
                // TS/TSX must come before JS/JSX
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('ts-loader'),
                        options: {
                            getCustomTransformers: () => ({
                                before: [
                                    IS_DEV_MODE && ReactRefreshTypeScript()
                                ].filter(Boolean)
                            }),
                            transpileOnly: IS_DEV_MODE
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'source-map-loader'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: alias,
        extensions: FILE_EXTS.map((extension) => '.' + extension).concat([
            '.ts',
            '.tsx', // TS(X) must come before JS(X)
            '.js',
            '.jsx',
            '.css'
        ])
    },
    plugins: [
        IS_DEV_MODE && new ReactRefreshWebpackPlugin({ overlay: false }),
        new CleanWebpackPlugin({ verbose: false }),
        new webpack.ProgressPlugin(),
        // expose and write the allowed env vars on the compiled bundle
        new webpack.EnvironmentPlugin({ NODE_ENV }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/manifest.json',
                    to: OUT_DIR,
                    force: true,
                    transform: function (content) {
                        // generates the manifest file using the package.json information
                        return Buffer.from(
                            JSON.stringify({
                                ...JSON.parse(content.toString()),
                                description: packageJson.description,
                                version: packageJson.version
                            })
                        );
                    }
                }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/pages/Content/content.styles.css',
                    to: OUT_DIR,
                    force: true
                }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/img/icon-128.png',
                    to: OUT_DIR,
                    force: true
                }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/img/icon-64.png',
                    to: OUT_DIR,
                    force: true
                }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/img/icon-34.png',
                    to: OUT_DIR,
                    force: true
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.join(
                PROJECT_ROOT,
                'src',
                'pages',
                'Newtab',
                'index.html'
            ),
            filename: 'newtab.html',
            chunks: ['newtab'],
            cache: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(
                PROJECT_ROOT,
                'src',
                'pages',
                'Options',
                'index.html'
            ),
            filename: 'options.html',
            chunks: ['options'],
            cache: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(
                PROJECT_ROOT,
                'src',
                'pages',
                'Popup',
                'index.html'
            ),
            filename: 'popup.html',
            chunks: ['popup'],
            cache: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(
                PROJECT_ROOT,
                'src',
                'pages',
                'Devtools',
                'index.html'
            ),
            filename: 'devtools.html',
            chunks: ['devtools'],
            cache: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(
                PROJECT_ROOT,
                'src',
                'pages',
                'Panel',
                'index.html'
            ),
            filename: 'panel.html',
            chunks: ['panel'],
            cache: false
        })
    ].filter(Boolean),
    infrastructureLogging: {
        level: 'info'
    }
};

export const options = {
    notHotReload: ['background', 'contentScript', 'devtools']
};

export default config;
