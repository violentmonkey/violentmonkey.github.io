module.exports = {
  extends: require.resolve('@gera2ld/plaid/config/babelrc'),
  presets: [
    '@babel/preset-react',
  ],
  plugins: [
    ['babel-plugin-module-resolver', {
      alias: {
        '@': './src',
      },
    }],
  ]
};
