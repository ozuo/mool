module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-var': 2, // http://eslint.org/docs/rules/no-var Ҫ��ʹ�� let �� const ������ var
    // 'prefer-const': 2,  // http://eslint.org/docs/rules/prefer-const Ҫ��ʹ�� const ������Щ�������ٱ��޸ĵı���
    'indent': ['error', 2] // 2 ���ո�����
  }
}
