import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'


export const useUserStore = defineStore('user',() => {
    const user = ref({

    })
    const avatarChar = computed(() => {
        if(user.value.name) {
            return user.value.name[0]
        }
        return 'A'
    })
    async function getUser() {
        userService.getUser()
            .then((response) => {
                user.value = response.data
            })
            .catch((error) => {
                errorHandler(error)
            })
    }
    return {user,getUser,avatarChar}
})