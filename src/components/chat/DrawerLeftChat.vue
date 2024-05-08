<script setup>

import ContactCard from '@/components/chat/ContactCard.vue'
import { ref } from 'vue'
import { messageService } from '@/service/messageService'
import { errorHandler } from '@/utils/errorHandler'
import { useMessageStore } from '@/stores/message'
import GroupChatCard from '@/components/chat/GroupChatCard.vue'

const perPage = ref(15)
const meta = ref({
  last_page: 1,
  current_page: 0
})

const metaGroup = ref({
  last_page: 1,
  current_page: 0
})
const showPerson = ref(true)

const messageStore = useMessageStore()

async function getLastMessages(page = 1, perPage = 2) {
  messageService.getLastMessages(page, perPage)
    .then(response => {
      messageStore.lastMessages.push(...response.data.data)
      meta.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function getGroupChats(page = 1, perPage = 2) {
  messageService.getGroupChats(page, perPage)
    .then(response => {
      messageStore.groupChats.push(...response.data.data)
      metaGroup.value = response.data.data
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function load({ done }) {
  if (showPerson.value) {
    if (meta.value.current_page < meta.value.last_page) {
      await getLastMessages(messageStore.lastMessages.length / perPage.value + 1, perPage.value - (messageStore.lastMessages.length % perPage.value))
    }
    if (meta.value.current_page === meta.value.last_page) done('empty')
    else {
      done('ok')
    }
  } else {
    if (metaGroup.value.current_page < metaGroup.value.last_page) {
      await getGroupChats(messageStore.groupChats.length / perPage.value + 1, perPage.value - (messageStore.groupChats.length % perPage.value))
    }

    if (metaGroup.value.current_page === metaGroup.value.last_page) done('empty')
    else {
      done('ok')
    }
  }
}

messageStore.lastMessages = []
messageStore.groupChats = []
getLastMessages(meta.value.current_page, perPage.value)
getGroupChats(metaGroup.value.current_page, perPage.value)
</script>

<template>
  <v-navigation-drawer location="left" width="350">
    <v-btn color="primary" variant="text" @click="showPerson = true">Users</v-btn>
    <v-btn color="primary" variant="text" @click="showPerson = false">Groups</v-btn>
    <v-infinite-scroll mode="manual" @load="load">
      <v-list v-if="showPerson">
        <v-list-item v-for="messsage in messageStore.lastMessages" :key="messsage.id">
          <ContactCard :message="messsage"></ContactCard>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item v-for="groupChat in messageStore.groupChats" :key="groupChat.id">
          <GroupChatCard :group-chat="groupChat"></GroupChatCard>
        </v-list-item>
      </v-list>
    </v-infinite-scroll>
  </v-navigation-drawer>
</template>

<style scoped>

</style>