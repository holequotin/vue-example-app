<script setup>

import { computed, ref, watchEffect } from 'vue'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'
import { checkURL } from '@/utils/fileUtils'
import { messageService } from '@/service/messageService'
import { useRoute } from 'vue-router'
import MessageItem from '@/components/chat/MessageItem.vue'
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import pusher from '@/notifications/pusher'

const props = defineProps(['id'])
const route = useRoute()
const messageStore = useMessageStore()
const perPage = ref(15)
const body = ref('')

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

const avatarChar = computed(() => {
  return user.value.name[0]
})

watchEffect(async () => {
  if (props.id) {
    console.log(props.id)
    messageStore.messages = []
    meta.value = {
      last_page: 1,
      current_page: 0
    }
    await getUser(props.id)
    await getMessage(props.id, perPage.value)
  }

  pusher.unsubscribe(`private-Chat.User.${userStore.user?.id}`)
  const channelChat = pusher.subscribe(`private-Chat.User.${userStore.user?.id}`)
  channelChat.bind('App\\Events\\MessageCreated', function(data) {
    const fromUserId = data.message.from_user.id
    console.log(fromUserId)
    if (route.name == 'chat' && fromUserId == route.params.id) {
      messageStore.push(data.message)
    } else if (route.name == 'chat' && fromUserId != route.params.id) {
      messageStore.newUserMessage(data.message)
    }
  })
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
      messageStore.messages.unshift(...response.data.data.reverse())
      meta.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function sendMessage() {
  body.value = body.value.trim()
  console.log(body.value)
  if (body.value) {
    const data = {
      body: body.value,
      to_user_id: props.id
    }
    messageService.storeMessage(data)
      .then(response => {
        messageStore.messages.push(response.data)
        body.value = ''
      })
      .catch(error => {
        errorHandler(error)
      })
  }
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
          <MessageItem v-for="message in messageStore.messages" :key="message"
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
      <v-text-field append-icon="mdi-send" @click:append="sendMessage" v-model="body"></v-text-field>
    </v-footer>
  </v-container>
</template>

<style scoped>

</style>