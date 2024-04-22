<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { notificationService } from '@/service/notificationService'
import { errorHandler } from '@/utils/errorHandler'
import { useNotificationStore } from '@/stores/notification'
import moment from 'moment'

const props = defineProps(['notify'])
const router = useRouter()
const icon = computed(() => {
  if (props.notify.read_at) return 'mdi-check'
  return 'mdi-circle'
})
const notificationStore = useNotificationStore()

const title = computed(() => {
  switch (props.notify.type) {
    case 'App\\Notifications\\FriendRequestNotification':
      return 'Friend request'
    case 'App\\Notifications\\CommentCreatedNotification':
      return 'Commented'
    case 'App\\Notifications\\GroupRequestNotification':
      return 'Join group request'
    default:
      return props.notify.type
  }
})

const event = computed(() => {
  switch (props.notify.type) {
    case 'App\\Notifications\\FriendRequestNotification':
      return toFriendRequest
    case 'App\\Notifications\\CommentCreatedNotification':
      return toPost
    case 'App\\Notifications\\GroupRequestNotification':
      return toJoinGroupRequest
    default:
      return () => console.log('Clicked on notify item')
  }
})

const toPost = () => {
  markAsRead()
  router.push({ name: 'show-post', params: { id: props.notify.data?.post_id } })
}

const toFriendRequest = () => {
  markAsRead()
  router.push({ name: 'friend_request' })
}

const toJoinGroupRequest = () => {
  markAsRead()
  router.push({ name: 'group_request' })
}

const markAsRead = () => {
  if (!props.notify.read_at) {
    notificationService.markAsRead(props.notify.id)
      .then((response) => {
        notificationStore.updateNotification(response.data.notification)
        notificationStore.meta.unread_count--
      })
      .catch((error) => {
        errorHandler(error)
      })
  }
}

</script>

<template>
  <v-list-item>
    <v-card @click="event" class="notify-card" :append-icon="icon" :title="title">
      <v-card-text>{{moment(props.notify.created_at).fromNow()}}</v-card-text>
    </v-card>
  </v-list-item>
</template>

<style scoped>
.notify-card {
  width: 300px;
  height: 100px;
}
</style>