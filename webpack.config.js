const path = require('path');
module.exports = {
    entry: "./src/managers/simulation.ts",
    mode: "production",
    output: {
        filename: "./index.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    }
}