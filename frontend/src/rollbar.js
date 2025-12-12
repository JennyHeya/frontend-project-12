import Rollbar from 'rollbar'

const token = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN || ''

let _rollbar = null
if (token && token !== 'POST_CLIENT_ITEM_ACCESS_TOKEN') {
  const rollbarConfig = {
    accessToken: token,
    environment: import.meta.env.MODE || 'development',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      person: {
        id: 'guest', // Р±СѓРґРµС‚ Р·Р°РјРµРЅСЏС‚СЊСЃСЏ РЅР° username РїРѕСЃР»Рµ Р»РѕРіРёРЅР°
      },
    },
  }

  _rollbar = new Rollbar(rollbarConfig)
} else {
  const noop = () => {}
  _rollbar = {
    error: noop,
    info: noop,
    warn: noop,
    configure: noop,
  }
}

export const rollbar = _rollbar
