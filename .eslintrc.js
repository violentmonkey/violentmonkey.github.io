module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid/eslint'),
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'prefer-arrow-callback': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    react: {
      version: '17.0.2',
    },
  },
};
