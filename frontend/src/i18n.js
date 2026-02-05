import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales/index.js'

// eslint-disable-next-line no-console
console.log('[i18n] Initializing with resources:', Object.keys(resources))

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('[i18n] Initialization complete')
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('[i18n] Initialization failed:', err)
  })

export default i18n

