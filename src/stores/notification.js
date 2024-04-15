import { defineStore } from 'pinia'
import { ref } from 'vue'
import { notificationService } from '@/service/notificationService'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref([])
  const meta = ref({
    last_page: 1,
    current_page: 0,
    unread_count: 0
  })

  function $reset() {
    notifications.value = []
    meta.value = {
      last_page: 1,
      current_page: 0,
      unread_count: 0
    }
  }

  async function getNotifications() {
    if (meta.value?.current_page < meta.value?.last_page || meta.value?.current_page === 0) {
      console.log('Get notification')
      notificationService.getNotifications(meta.value?.current_page + 1, 15)
        .then((response) => {
          meta.value = response.data.meta
          notifications.value.push(...response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  async function updateNotification(notification) {
    notifications.value = notifications.value.map((item) => {
      if (item.id !== notification.id) return item
      return notification
    })
  }

  function markAllAsRead() {
    notifications.value = notifications.value.map((item) => {
      if (!item.read_at) return { ...item, read_at: true }
      return item
    })
    meta.value.unread_count = 0
  }

  return { notifications, getNotifications, $reset, updateNotification, meta, markAllAsRead }
})