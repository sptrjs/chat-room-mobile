const antfu = require('@antfu/eslint-config')

module.exports = antfu.antfu(
  {
    test: false,
    typescript: true,
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
  {
    rules: {
      'no-use-before-define': 'off',
      'ts/no-use-before-define': 'off',
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',
      'no-restricted-syntax': 'off',
      'no-console': 'off',
      'ts/no-redeclare': 'off',
      'ts/no-namespace': 'off',
      'import/no-mutable-exports': 'off',
      'ts/prefer-literal-enum-member': 'off',
      'ts/consistent-type-definitions': 'off',
    },
  },
)
