import {ref, computed} from 'vue'
import { defineStore } from 'pinia'
import { userService } from '../service/userService'
import { errorHandler } from '../utils/errorHandler'



export const useUserStore = defineStore('user',() => {
    const user = ref({
        id : 1,
        name : '',
        email : ''
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
                const userData = response.data
                user.value = userData
            })
            .catch((error) => {
                errorHandler(error)
            })
    }
    return {user,getUser,avatarChar}
})