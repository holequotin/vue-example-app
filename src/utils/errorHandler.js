import router from '../router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const getMessage = function (error) {
  if (error.response) {
    return error.response.data.error || error.response.data.message
  }
  return error.message
}
const errorHandler = function (error) {
  console.log(error);
  switch (error.response.status) {
    case 401:
      router.replace({ name: 'login' })
      localStorage.setItem('token', '')
      toast.error('Unauthorization')
      break
    case 500:
      toast.error('Internal Server Error')
      break
    case 404:
      toast.error('Not Found')
      router.replace({ name: 'NotFound' })
      break;
    default:
      toast.error(error.response.data.message || error.response.data.error)
      break
  }
}
export { getMessage, errorHandler }
