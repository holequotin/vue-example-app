<script setup>
import NotifyItem from '@/components/home/appbar/NotifyItem.vue'
import { useNotificationStore } from '@/stores/notification'
import { notificationService } from '@/service/notificationService'
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'

const notificationStore = useNotificationStore()
const alertStore = useAlertStore()

async function load({ done }) {
  await notificationStore.getNotifications()
  if (notificationStore.meta?.current_page === notificationStore.meta?.last_page) done('empty')
  else {
    done('ok')
  }
}

function markAllAsRead() {
  notificationService.markAllAsRead()
    .then((response) => {
      notificationStore.markAllAsRead()
      alertStore.showAlert(response.data.message, MessageType.SUCCESS)
    })
    .catch((error) => {
      errorHandler(error)
    })
}

notificationStore.notifications = []
notificationStore.meta = {
  current_page: 0,
  last_page: 1,
  unread_count: 0
}

notificationStore.getNotifications()

</script>

<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-badge color="red" style="margin-top: 20px" v-if="notificationStore.meta?.unread_count"
               :content="notificationStore.meta.unread_count">
        <v-icon icon="mdi-bell-outline" size="x-large" v-bind="props"></v-icon>
      </v-badge>
      <v-icon icon="mdi-bell-outline" size="x-large" v-bind="props" v-else style="margin-top: 20px"></v-icon>
    </template>
    <v-infinite-scroll :height="500" :onLoad="load" class="infinite" color="secondary" mode="manual">
      <v-btn class="ma-2" @click="markAllAsRead">
        Mark all as read
      </v-btn>
      <NotifyItem v-for="notification in notificationStore.notifications" :key="notification"
                  :notify="notification"></NotifyItem>
    </v-infinite-scroll>
  </v-menu>
</template>

<style scoped>
.notify-card {
  width: 300px;
  height: 100px;
}

.infinite {
  background-color: #615656;
}
</style>