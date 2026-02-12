import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import babelParser from '@babel/eslint-parser'

export default [
  // JS/JSX Parser Setup (for React)
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
  },

  // Apply stylistic rules
  {
    files: ['src/**/*.{js,jsx}'],
    ...stylistic.configs.recommended,
  },

  // React recommended rules
  {
    files: ['src/**/*.{js,jsx}'],
    rules: {
      ...reactPlugin.configs.recommended.rules,
    },
  },

  // JS recommended config
  {
    files: ['src/**/*.{js,jsx}'],
    ...js.configs.recommended,
  },

  // Disable specific rules
  {
    files: ['src/**/*.{js,jsx}'],
    rules: {
      // Example: Disable stylistic rules
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/no-mixed-operators': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Example: Adjust core rules
      'no-undef': 'warn',
    },
  },
]
