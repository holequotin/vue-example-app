import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'
import router from '@/router'

const alertStore = useAlertStore()

const notificationHandler = function(data) {
  console.log(data)
  switch (data.type) {
    case 'App\\Notifications\\CommentCreatedNotification':
      console.log(router)
      alertStore.showAlert('Some one comment your post', MessageType.INFO, () => router.push({
        name: 'show-post',
        params: { id: data.post_id }
      }))
      break
    case 'App\\Notifications\\FriendRequestNotification':
      alertStore.showAlert('Some one send your friend request', MessageType.INFO)
      break
    case 'App\\Notifications\\GroupRequestNotification':
      alertStore.showAlert('Some one want to join your group', MessageType.INFO, () => router.push({
        name: 'group_request'
      }))
      break
    default:
      alertStore.showAlert(data.type, MessageType.ERROR)
      break
  }
}
export { notificationHandler }
