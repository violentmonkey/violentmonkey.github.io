module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
    'airbnb-base/rules/strict',
    'airbnb/rules/react',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
    'arrow-parens': ['error', 'as-needed'],
    'no-console': 'off',
    'react/no-danger': 'off',
    'no-param-reassign': 'off',
  },
};
