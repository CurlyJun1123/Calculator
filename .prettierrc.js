module.exports = {
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    { files: '.prettierrc', options: { parser: 'json' } },
    { files: 'document.ejs', options: { parser: 'html' } },
  ],
  printWidth: 170,
  proseWrap: 'never',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
}
