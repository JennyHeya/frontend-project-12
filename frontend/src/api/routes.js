export const apiPath = '/api/v1'

export const userRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
}

export const dataRoutes = {
  channels: () => [apiPath, 'channels'].join('/'),
  channel: id => [apiPath, 'channels', id].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
}

export const pagesRoutes = {
  chat: () => '/',
  login: () => '/login',
  signup: () => '/signup',
}
