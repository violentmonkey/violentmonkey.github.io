module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid/eslint'),
    require.resolve('@gera2ld/plaid-common-react/eslint'),
  ],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
  },
};
