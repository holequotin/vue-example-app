import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { notificationService } from '@/service/notificationService'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref([])
  const meta = ref(null)
  const currentPage = ref(0)

  function $reset() {
    notifications.value = []
    meta.value = null
    currentPage.value = 0
  }

  async function getNotifications() {
    if (currentPage.value < meta.value?.last_page || currentPage.value === 0) {
      notificationService.getNotifications(currentPage.value + 1, 5)
        .then((response) => {
          currentPage.value = response.data.meta.current_page
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
      if(item.id !== notification.id) return item;
      return notification;
    })
  }

  function markAllAsRead() {
    notifications.value = notifications.value.map((item) => {
      if(!item.read_at) return {...item, read_at: true}
      return item
    })
    meta.value.unread_count = 0
  }
  return { notifications, getNotifications, $reset, updateNotification, meta, markAllAsRead}
})