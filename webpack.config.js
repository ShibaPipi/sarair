// require the main @nrwl/react/plugins/webpack configuration function.
const nxBaseConfig = require('@nrwl/react/plugins/webpack')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = config => {
    nxBaseConfig(config)

    const customConfig = process.argv.includes('--report') ? {
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true
            })
        ]
    } : {}

    return {
        ...config,
        ...customConfig,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        priority: 10,
                        enforce: true,
                    },
                    react: {
                        name: 'react',
                        test: module => /react|redux/.test(module.context),
                        chunks: 'initial',
                        priority: 11,
                        enforce: true,
                    },
                    antd: {
                        name: 'antd',
                        test: (module) => {
                            return /ant/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 11,
                        enforce: true,
                    },
                    moment: {
                        name: 'moment',
                        test: (module) => {
                            return /moment/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 13,
                        enforce: true,
                    }
                }
            }
        }
    }
}
