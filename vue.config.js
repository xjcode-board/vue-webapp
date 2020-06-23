module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://t-api.com', //测试环境
                changeOrigin: true
            }
        }
    }
};