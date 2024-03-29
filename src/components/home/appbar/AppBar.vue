<template>
  <v-app-bar>
    <template #prepend>
      <v-container grid-list-xs class="d-flex flex-row justify-center" style="width: 400px;">
        <HomeButton></HomeButton>
        <SearchBox></SearchBox>
      </v-container>
    </template>
    <template #append>
      <v-container grid-list-xs class="d-flex flex-row justify-end" style="width: 400px;">
        <NotifyList></NotifyList>
        <v-btn class="ma-2" variant="tonal" icon="mdi-menu" size="large" :elevation="12"></v-btn>
        <v-btn class="ma-2" variant="tonal" icon="mdi-facebook-messenger" size="large" :elevation="12"></v-btn>
        <AvatarMenu></AvatarMenu>
      </v-container>
    </template>
    <template #default>
      <NavigationBar></NavigationBar>
    </template>
  </v-app-bar>
</template>

<script setup>
import SearchBox from './SearchBox.vue'
import HomeButton from './HomeButton.vue'
import NavigationBar from './NavigationBar.vue'
import AvatarMenu from './AvatarMenu.vue'
import pusher from '../../../notifications/pusher'

import { notificationHandler } from '@/handler/notificationHandler'
import { watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import NotifyList from '@/components/home/appbar/NotifyList.vue'

const userStore = useUserStore()

watchEffect(() => {
  const channel = pusher.subscribe(`private-App.Models.User.${userStore.user.id}`)
  channel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', function(data) {
    notificationHandler(data)
  })
})
</script>