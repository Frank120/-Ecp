module.exports = {
    watch: true,
    entry: {
        'script': './dev/js/index'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_conponents)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
};