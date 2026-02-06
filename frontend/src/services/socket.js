import { io } from 'socket.io-client'

let socket = null

export const initSocket = (token) => {
  if (socket) return socket

  try {
    // Prefer a global `window.io` if present (Playwright tests stub this),
    // otherwise fall back to the bundled `socket.io-client` import.
    const ioImpl = (typeof window !== 'undefined' && window.io) ? window.io : io
    socket = ioImpl({
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