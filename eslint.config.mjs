import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      sourceType: 'commonjs',
    },
    rules: {
      'no-prototype-builtins': 'off',
    },
  },
]
