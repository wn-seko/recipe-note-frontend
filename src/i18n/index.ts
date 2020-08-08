import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ja from './ja'

const debug = process.env.NODE_ENV === 'development'

export type Language = 'ja' // | 'en' | 'zh'

i18n.use(LanguageDetector).init({
  debug,
  defaultNS: 'shared',
  fallbackLng: 'ja',
  resources: { ja },

  ns: ['shared'],

  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },

  keySeparator: false,

  react: {
    wait: true,
  },
})

export default i18n
