import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: 'f41e4c2c8ddf473e989c9d89f49383ce39655bb4a72803ba01752bbe305b56d40589e0a45d438b4342f03e932e0b36de',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    person: {
      id: 'guest', // будет заменяться на username после логина
    },
  },
};

export const rollbar = new Rollbar(rollbarConfig);