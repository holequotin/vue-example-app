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
  // Perform API call
  await notificationStore.getNotifications()
  done('empty')
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
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-badge color="red" style="margin-top: 20px" v-if="notificationStore.meta?.unread_count"
               :content="notificationStore.meta.unread_count">
        <v-icon icon="mdi-bell-outline" size="x-large" v-bind="props"></v-icon>
      </v-badge>
      <v-icon icon="mdi-bell-outline" size="x-large" v-bind="props" v-else style="margin-top: 20px"></v-icon>
    </template>
    <v-infinite-scroll :height="500" color="secondary" class="infinite" :onLoad="load">
      <v-btn class="ma-2" @click="markAllAsRead">
        Mark all as read
      </v-btn>
      <template v-for="notification in notificationStore.notifications" :key="notification">
        <NotifyItem :notify="notification"></NotifyItem>
      </template>
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