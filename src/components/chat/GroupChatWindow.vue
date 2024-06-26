<script setup>

import { computed, ref, watchEffect } from 'vue'
import { errorHandler } from '@/utils/errorHandler'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import { groupChatService } from '@/service/groupChatService'
import GroupMessageItem from '@/components/chat/GroupMessageItem.vue'
import MembersDialog from '@/components/chat/MembersDialog.vue'
import AddUserDialog from '@/components/chat/AddUserDialog.vue'
import LeaveGroupDialog from '@/components/chat/LeaveGroupDialog.vue'
import { useToast } from 'vue-toastification'

const props = defineProps(['id'])
const toast = useToast()
const route = useRoute()
const router = useRouter()
const messageStore = useMessageStore()
const perPage = ref(15)
const body = ref('')

const meta = ref({
  last_page: 1,
  current_page: 0
})

const groupChat = ref({
  'id': 18,
  'name': 'New name from user id 4',
  'created_at': null
})

const userStore = useUserStore()

const avatarChar = computed(() => {
  return groupChat.value.name[0]
})

watchEffect(async () => {
  if (props.id) {
    messageStore.messages = []
    meta.value = {
      last_page: 1,
      current_page: 0
    }
    await getGroupChat(props.id)
    await getGroupChatMessage(props.id, perPage.value)
  }
})

async function getGroupChat(id) {
  groupChatService.getGroupChatById(id)
    .then(response => {
      groupChat.value = response.data
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function getGroupChatMessage(id, perPage = 15) {
  await groupChatService.getMessage(id, meta.value.current_page + 1, perPage)
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
  if (body.value) {
    const data = {
      body: body.value,
      group_chat_id: props.id
    }
    groupChatService.storeMessage(data)
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
  await getGroupChatMessage(route.params.id, perPage.value)
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
          <span class="text-h5">{{ avatarChar }}</span>
        </v-avatar>
      </template>
      <v-app-bar-title>{{ groupChat?.name }}</v-app-bar-title>
      <template #append>
        <MembersDialog :id="id"></MembersDialog>
        <AddUserDialog :id="id"></AddUserDialog>
        <LeaveGroupDialog :id="id"></LeaveGroupDialog>
      </template>
    </v-app-bar>
    <v-main>
      <v-infinite-scroll min-height="100%" min-width="100%" mode="manual" side="start" @load="load">
        <v-container fluid>
          <GroupMessageItem v-for="message in messageStore.messages"
                            :key="message"
                            :message="message"
                            :owner="message?.user?.id === userStore.user?.id"
          >
          </GroupMessageItem>
        </v-container>
      </v-infinite-scroll>
    </v-main>
    <v-footer
      app
      name="footer"
    >
      <v-text-field v-model="body" append-icon="mdi-send" @click:append="sendMessage"></v-text-field>
    </v-footer>
  </v-container>
</template>

<style scoped>

</style>