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
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
    'arrow-parens': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/no-array-index-key': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
  },
};
