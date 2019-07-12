module.exports =
  // eslint
  {
    root: true,
    parser: 'babel-eslint', // 使用babel解析器
    // 加入各个环境的全局变量
    env: {
      es6: true,
      node: true,
      jest: true
    },
    extends: [
      "plugin:prettier/recommended",
      "plugin:react/recommended",
      "eslint:recommended"
    ],
    settings: {
      'import/resolver': {
        'babel-module': {
          paths: ['src']
        }
      }
    },
    rules: {
      'no-console': 'off', // 是否允许使用console，eslint/recommended默认开启，这里把它关闭了
      'react/prop-types': [0] // 要求组件指定proptypes
    }
  }
