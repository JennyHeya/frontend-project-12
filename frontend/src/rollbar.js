import Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    person: {
      id: 'guest', // будет заменяться на username после логина
    },
  },
}

export const rollbar = new Rollbar(rollbarConfig)