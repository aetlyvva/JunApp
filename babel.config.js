const plugins = [
  [
    'module-resolver',
    {
      cwd: 'babelrc',
      root: ['./src']
    }
  ],
  [
    'import',
    {
      libraryName: '"@ant-design/react-native"'
    }
  ],
  ['@babel/plugin-proposal-decorators', { legacy: true }]
]
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins
}
