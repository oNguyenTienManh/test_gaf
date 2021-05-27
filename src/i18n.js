const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'ja-JP',
  otherLanguages: ['ja-JP'],
  fallbackLng: 'ja-JP',
  serverLanguageDetection: true,
});
