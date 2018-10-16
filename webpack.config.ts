import * as webpack from 'webpack';
import * as path from 'path';

// noinspection SpellCheckingInspection
let config: webpack.Configuration = {
    entry: {
        "cigen": './src/cigen.ts'
    },
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "#!/usr/bin/env node", raw: true
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/'),
        libraryTarget: "umd",
        globalObject: "(typeof window !== 'undefined' ? window : this)"
    },
    module: {rules: [{test: /\.tsx?$/, use: 'ts-loader'}]},
    target: "node",
    node: {__dirname: false, __filename: false}
};

export default config;
