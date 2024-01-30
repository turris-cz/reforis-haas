/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const path = require("path");
const webpack = require("webpack");

module.exports = () => ({
    mode: "development",
    entry: "./src/app.js",
    output: {
        // Build js app to ../reforis_static{python_module_name}/app.min.js
        // See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
        filename: "app.min.js",
        path: path.join(__dirname, "../reforis_static/reforis_haas/js/"),
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "./src"),
            path.resolve(__dirname, "./node_modules"),
        ],
        alias: {
            process: "process/browser",
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!foris)/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
    // Equal to peerDependencies in package.json
    externals: {
        "prop-types": "PropTypes",
        react: "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM",
    },
});
