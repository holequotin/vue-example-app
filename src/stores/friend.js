import { defineStore } from 'pinia'
import {ref} from 'vue'
import { friendService } from '../service/friendService'
import {getMessage} from '../utils/errorHandler'
import { useAlertStore } from './alert'
import { MessageType } from '../utils/MessageType'
export const useFriendsStore = defineStore('friends', () => {
    const friends = ref([])
    async function getAllFriends() {
        friendService.getFriends()
            .then((response) => {
                friends.value = response.data
            })
            .catch((error) => {
                const message = getMessage(error);
                const alertStore = useAlertStore()
                alertStore.showAlert(message,MessageType.ERROR)
            })
    }
    return {friends, getAllFriends}
}) 