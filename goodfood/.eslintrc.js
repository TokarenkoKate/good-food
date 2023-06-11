module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'import',
    'jsx-a11y',
    'react-hooks',
    'prettier',
  ],
  rules: {
    // Add your own rules here
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'error',
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  env: {
    jest: true,
  },
};
