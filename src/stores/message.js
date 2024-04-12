import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
  const messages = ref([])

  function $reset() {
    messages.value = []
  }

  function push(message) {
    messages.value.push(message)
  }

  return { messages, $reset, push }
})
