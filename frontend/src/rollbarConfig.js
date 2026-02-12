const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
    client: {
      javascript: {
        code_version: '1.0.0',
      },
    },
  },
}

export default rollbarConfig
