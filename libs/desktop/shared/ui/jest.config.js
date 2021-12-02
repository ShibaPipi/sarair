module.exports = {
    displayName: 'desktop-shared-ui',
    preset: '../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../coverage/libs/desktop/shared/ui'
}
