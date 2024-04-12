import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MessageType } from '../utils/MessageType'

export const useAlertStore = defineStore('alerts', () => {
  const messageState = ref('')
  const typeState = ref(MessageType.INFO)
  const actionState = ref(null)

  function showAlert(message, type, action = null) {
    messageState.value = message
    typeState.value = type
    actionState.value = action
  }

  function hideAlert() {
    messageState.value = '',
      typeState.value = MessageType.NONE
  }

  function setAction(action = null) {
    actionState.value = action
  }

  return {
    messageState,
    typeState,
    actionState,
    showAlert,
    hideAlert,
    setAction
  }
})