// require the main @nrwl/react/plugins/webpack configuration function.
const nxBaseConfig = require('@nrwl/react/plugins/webpack')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = config => {
    nxBaseConfig(config)

    const customConfig = process.env.NODE_ENV === 'production' ? {
        plugins: [
             [
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: 'report.html',
                    defaultSizes: 'parsed',
                    openAnalyzer: true
                })
            ]
        ]
    } : {}

    return {
        ...config,
        ...customConfig
    }
}
