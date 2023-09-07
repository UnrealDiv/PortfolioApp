const path = require("path");

module.exports = {
    entry:"./src/main.js",
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer:{
        static:path.resolve(__dirname,'dist'),
        port:4500
    },
}