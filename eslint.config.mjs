// eslint.config.mjs
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  {
    ignores: ['dist/', 'frontend/dist/', 'node_modules/'],
  },
  js.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'semi': ['error', 'never'],
      'no-extra-semi': 'error',
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/indent': ['error', 2],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]
