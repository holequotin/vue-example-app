import {ref, computed} from 'vue'
import { defineStore } from 'pinia'
import { userService } from '../service/userService'
import { useAlertStore } from './alert'
// import { getMessage } from '../utils/errorHandler'
import { MessageType } from '../utils/MessageType'

export const useUserStore = defineStore('user',() => {
    const user = ref({})
    const avatarChar = computed(() => {
        if(user.value.name) {
            return user.value.name[0]
        }
        return 'A'
    })
    function getUser() {
        userService.getUser()
            .then((response) => {
                const userData = response.data
                user.value = userData
            })
            .catch((error) => {
                //const message = getMessage(error)
                console.log(error)
                const alertStore = useAlertStore()
                alertStore.showAlert('This error from getUser',MessageType.ERROR)
            })
    }
    return {user,getUser,avatarChar}
})