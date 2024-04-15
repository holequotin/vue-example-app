import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const notificationHandler = function(data) {
  console.log(data)
  notificationStore.$reset()
  notificationStore.getNotifications()
}
export { notificationHandler }
