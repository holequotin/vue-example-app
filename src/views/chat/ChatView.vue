<script setup>

import BaseLayout from '@/views/base/BaseLayout.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import DrawerLeftChat from '@/components/chat/DrawerLeftChat.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import { useUserStore } from '@/stores/user'
import { watchEffect } from 'vue'

const userStore = useUserStore()

watchEffect(() => {
  userStore.getUser()
})
</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <ChatWindow v-if="$route.params.id" :id="$route.params.id"></ChatWindow>
    </template>
    <template #left-drawer>
      <DrawerLeftChat></DrawerLeftChat>
    </template>
    <template #right-drawer>
      <div></div>
    </template>
  </BaseLayout>
</template>

<style scoped>

</style>