<script setup>

import { computed, ref, watch, watchEffect } from 'vue'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'
import { checkURL } from '@/utils/fileUtils'
import { messageService } from '@/service/messageService'
import { useRoute } from 'vue-router'
import MessageItem from '@/components/chat/MessageItem.vue'
import { useUserStore } from '@/stores/user'

const props = defineProps(['id'])
const route = useRoute()
const perPage = ref(15)

const meta = ref({
  last_page: 1,
  current_page: 0
})
const userStore = useUserStore()

const user = ref({
  'id': 21,
  'name': 'Alene Klein',
  'email': 'heaney.fletcher@example.org',
  'avatar': 'http://localhost:8000/storage/avatars/21/zBocVFF3Govgm9cFeQc4JFnIcdPPvf2weP8wlDzU.png'
})
const messages = ref([])

const avatarChar = computed(() => {
  return user.value.name[0]
})

watchEffect(async () => {
  if (props.id) {
    await getUser(props.id)
    await getMessage(route.params.id, perPage.value)
  }
})

watch(route.params.id, () => {
  messages.value = []
  meta.value = {
    last_page: 1,
    current_page: 0
  }
})

async function getUser(id) {
  userService.getUserById(id)
    .then(response => {
      user.value = response.data
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function getMessage(id, perPage = 15) {

  await messageService.getMessages(id, meta.value.current_page + 1, perPage)
    .then(response => {
      messages.value.unshift(...response.data.data.reverse())
      meta.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function load({ done }) {
  await getMessage(route.params.id, perPage.value)
  if (meta.value.current_page === meta.value.last_page) done('empty')
  else {
    done('ok')
  }
}

</script>

<template>
  <v-container fluid>
    <v-app-bar>
      <template v-slot:prepend>
        <v-avatar color="blue-darken-2" size="large">
          <v-img v-if="checkURL(user.avatar)" alt="John" :src="user.avatar"></v-img>
          <span v-else class="text-h5">{{ avatarChar }}</span>
        </v-avatar>
      </template>
      <v-app-bar-title>{{ user.name }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-infinite-scroll @load="load" side="start" mode="manual" min-height="100%" min-width="100%">
        <v-container fluid>
          <MessageItem v-for="message in messages" :key="message"
                       :owner="message.from_user.id == userStore.user?.id"
                       :message="message"
          ></MessageItem>
        </v-container>
      </v-infinite-scroll>
    </v-main>
    <v-footer
      name="footer"
      app
    >
      <v-text-field append-icon="mdi-send" @click:append="console.log('Send message')"></v-text-field>
    </v-footer>
  </v-container>
</template>

<style scoped>

</style>