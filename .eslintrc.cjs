/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  'globals': {
    'defineProps': 'readonly'
  },
  rules: {
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    'arrow-parens': ['warn', 'always'],
    'space-in-parens': ['warn', 'never'],
    'func-call-spacing': 'warn',
    'block-spacing': 'warn',
    'space-before-blocks': 'warn',
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'space-infix-ops': 'warn',
    'no-trailing-spaces': 'warn',
    'arrow-spacing': [
      'warn',
      {
        before: true,
        after: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/key-spacing': 'warn',
    'vue/object-curly-newline': 'warn',
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0
      }
    ],
    'space-before-function-paren': ['warn', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'object-curly-newline': [
      'warn',
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
          minProperties: 3
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 3
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
          minProperties: 3
        }
      }
    ],
    indent: ['warn', 2],
    'comma-dangle': ['warn', 'only-multiline'],
    'comma-spacing': 'warn',
  }
}
