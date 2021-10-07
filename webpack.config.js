var webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs-extra"),
    env = require("./utils/env"),
    { CleanWebpackPlugin } = require("clean-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    TerserPlugin = require("terser-webpack-plugin");

const ASSET_PATH = process.env.ASSET_PATH || "/";

var alias = {
    "react-dom": "@hot-loader/react-dom",
};

// load the secrets
var secretsPath = path.join(__dirname, "secrets." + env.NODE_ENV + ".js");

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
    alias["secrets"] = secretsPath;
}

var options = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        options: path.join(__dirname, "src", "pages", "Options", "index.tsx"),
        popup: path.join(__dirname, "src", "pages", "Popup", "index.tsx"),
        background: path.join(__dirname, "src", "pages", "Background", "index.ts"),
        contentScript: path.join(__dirname, "src", "pages", "Content", "index.ts"),
    },
    chromeExtensionBoilerplate: {
        notHotReload: ["contentScript"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js",
        publicPath: ASSET_PATH,
    },
    module: {
        rules: [
            {
                // look for .css or .scss files
                test: /\.(css|scss)$/,
                // in the `src` directory
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                    context: "src",
                    esModule: false,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/,
            },
            { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "source-map-loader",
                    },
                    {
                        loader: "babel-loader",
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: alias,
        extensions: fileExtensions.map((extension) => "." + extension).concat([".js", ".jsx", ".ts", ".tsx", ".css"]),
    },
    plugins: [
        new webpack.ProgressPlugin(),
        // clean the build folder
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: true,
        }),
        // expose and write the allowed env vars on the compiled bundle
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/manifest.json",
                    to: path.join(__dirname, "build"),
                    force: true,
                    transform: function (content, path) {
                        // generates the manifest file using the package.json informations
                        return Buffer.from(
                            JSON.stringify({
                                description: process.env.npm_package_description,
                                version: process.env.npm_package_version,
                                ...JSON.parse(content.toString()),
                            })
                        );
                    },
                },
                {
                    from: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
                },
            ],
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: "src/Content/content.styles.scss",
        //             to: path.join(__dirname, "build"),
        //             force: true,
        //         },
        //     ],
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "pages", "Options", "index.html"),
            filename: "options.html",
            chunks: ["options"],
            cache: false,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "pages", "Popup", "index.html"),
            filename: "popup.html",
            chunks: ["popup"],
            cache: false,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "pages", "Background", "index.html"),
            filename: "background.html",
            chunks: ["background"],
            cache: false,
        }),
    ],
    infrastructureLogging: {
        level: "info",
    },
};

if (env.NODE_ENV === "development") {
    options.devtool = "inline-source-map";
} else {
    options.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    };
}

module.exports = options;
