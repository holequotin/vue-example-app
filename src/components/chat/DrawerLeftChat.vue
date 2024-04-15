<script setup>

import ContactCard from '@/components/chat/ContactCard.vue'
import { ref } from 'vue'
import { messageService } from '@/service/messageService'
import { errorHandler } from '@/utils/errorHandler'
import { useMessageStore } from '@/stores/message'

const perPage = ref(15)
const meta = ref({
  last_page: 1,
  current_page: 0
})
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

async function load({ done }) {
  if (meta.value.current_page < meta.value.last_page) {
    await getLastMessages(messageStore.lastMessages.length / perPage.value + 1, perPage.value - (messageStore.lastMessages.length % perPage.value))
  }
  if (meta.value.current_page === meta.value.last_page) done('empty')
  else {
    done('ok')
  }
}

messageStore.lastMessages = []
getLastMessages(meta.value.current_page, perPage.value)

</script>

<template>
  <v-navigation-drawer location="left" width="350">
    <v-infinite-scroll mode="manual" @load="load">
      <v-list>
        <v-list-item v-for="messsage in messageStore.lastMessages" :key="messsage.id">
          <ContactCard :message="messsage"></ContactCard>
        </v-list-item>
      </v-list>
    </v-infinite-scroll>
  </v-navigation-drawer>
</template>

<style scoped>

</style>