import Rollbar from 'rollbar'

const token = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN || '';

// If no token provided, export a noop-compatible stub to avoid runtime errors
if (!token || token === 'POST_CLIENT_ITEM_ACCESS_TOKEN') {
  const noop = () => {};
  export const rollbar = {
    error: noop,
    info: noop,
    warn: noop,
    configure: noop,
  };
} else {
  const rollbarConfig = {
    accessToken: token,
    environment: import.meta.env.MODE || 'development',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      person: {
        id: 'guest', // будет заменяться на username после логина
      },
    },
  };

  export const rollbar = new Rollbar(rollbarConfig);
}