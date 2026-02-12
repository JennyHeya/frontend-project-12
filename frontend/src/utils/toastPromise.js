import { toast } from 'react-toastify'

const toastPromise = (promise, message) => toast.promise(promise, {
  pending: {
    render() {
      return message.loading
    },
  },
  success: {
    render() {
      return message.success || 'Channel created!'
    },
  },
  error: {
    render() {
      return message.error
    },
  },
})

export default toastPromise
