import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'

export const useMessageStore = defineStore('message', () => {
  const messages = ref([])
  const lastMessages = ref([])
  const groupChats = ref([])
  const userStore = useUserStore()

  function $reset() {
    messages.value = []
    lastMessages.value = []
    groupChats.value = []
  }

  function push(message) {
    messages.value.push(message)
  }

  function newUserMessage(message) {
    const user = message.from_user.id === userStore.user.id ? message.to_user : message.from_user
    let isExist = false

    lastMessages.value = lastMessages.value.map((item) => {
      if (item.from_user.id == user.id || item.to_user.id == user.id) {
        isExist = true
        return message
      }
      return item
    })
    if (!isExist) {
      lastMessages.value.unshift(message)
    }
  }

  function newGroupChat(groupChat) {
    let isExists = false

    groupChats.value = groupChats.value.map((item) => {
      if (groupChat.id === item.id) {
        isExists = true
        return groupChat
      }
      return item
    })

    if (!isExists) {
      groupChats.value.unshift(groupChat)
    }
  }

  return { messages, lastMessages, groupChats, $reset, push, newUserMessage, newGroupChat }
})
