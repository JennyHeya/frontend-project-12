import { io } from 'socket.io-client'

let socket = null

export const initSocket = (token) => {
  if (socket) return socket

  socket = io('', {
    transports: ['websocket'],
    auth: { token },
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    console.warn('Socket not initialized yet. Call initSocket(token) first.')
    return null
  }
  return socket
}

