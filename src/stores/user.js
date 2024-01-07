import {ref, computed} from 'vue'
import { defineStore } from 'pinia'
import { userService } from '../service/userService'
import { errorHandler } from '../utils/errorHandler'



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
                // console.log(error.response.status)
                // router.replace({name: 'login'})
                // const message = getMessage(error)
                // const alertStore = useAlertStore()
                // alertStore.showAlert(message,MessageType.ERROR)
                errorHandler(error)
            })
    }
    return {user,getUser,avatarChar}
})