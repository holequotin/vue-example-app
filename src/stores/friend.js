import { defineStore } from 'pinia'
import { ref } from 'vue'
import { friendService } from '@/service/friendService'
import { getMessage } from '@/utils/errorHandler'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useFriendsStore = defineStore('friends', () => {
    const friends = ref([])
    async function getAllFriends() {
        friendService.getFriends()
            .then((response) => {
                friends.value = response.data.data
            })
            .catch((error) => {
                const message = getMessage(error);
              toast.error(message)
            })
    }
    return {friends, getAllFriends}
}) 