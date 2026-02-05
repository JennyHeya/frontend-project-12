import { io } from 'socket.io-client'

let socket = null

export const initSocket = (token) => {
  if (socket) return socket

  try {
    socket = io({
      transports: ['websocket'],
      auth: { token },
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Socket init failed', e)
  }

  return socket
}

export const getSocket = () => socket