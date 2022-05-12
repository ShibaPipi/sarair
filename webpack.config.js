// require the main @nrwl/react/plugins/webpack configuration function.
const nxBaseConfig = require('@nrwl/react/plugins/webpack')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = (config, context) => {
    nxBaseConfig(config)
    return {
        ...config
        // overwrite values here
        // plugins: [
        //     new BundleAnalyzerPlugin({
        //         analyzerMode: 'static',
        //         reportFilename: 'report.html',
        //         defaultSizes: 'parsed',
        //         openAnalyzer: true
        //     })
        // ]
    }
}
