import { ref} from 'vue'
import { defineStore } from 'pinia'
import { MessageType } from '../utils/MessageType'

export const useAlertStore = defineStore('alerts',() => {
    const messageState = ref("No Message")
    const typeState = ref(MessageType.INFO)

    function showAlert(message, type) {
        messageState.value = message,
        typeState.value = type
    }
    
    function hideAlert() {
        messageState.value = '',
        typeState.value = MessageType.NONE
    }

    return {
        messageState,
        typeState,
        showAlert,
        hideAlert
    }
})