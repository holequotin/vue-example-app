import router from '../router'
import { useAlertStore } from '../stores/alert'
import { MessageType } from './MessageType'

const alertStore = useAlertStore()
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
      alertStore.showAlert('Unauthorization', MessageType.ERROR)
      break
    case 500:
      alertStore.showAlert('Internal Server Error', MessageType.ERROR)
      break
    case 404:
      alertStore.showAlert('Not Found', MessageType.ERROR)
      break;
    default:
      alertStore.showAlert(error.response.data.message || error.response.data.error, MessageType.ERROR)
      break
  }
}
export { getMessage, errorHandler }
