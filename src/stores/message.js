import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
  const messages = ref([])
  const lastMessages = ref([])

  function $reset() {
    messages.value = []
    lastMessages.value = []
  }

  function push(message) {
    messages.value.push(message)
  }

  return { messages, lastMessages, $reset, push }
})
