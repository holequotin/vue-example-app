import {ref} from 'vue'
import { defineStore } from 'pinia'
import { apiService } from '../service/apiService'
import { useAlertStore } from './alert'
// import { getMessage } from '../utils/errorHandler'
import { MessageType } from '../utils/MessageType'

export const useUserStore = defineStore('user',() => {
    const user = ref({})
    function getUser() {
        apiService.getUser()
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
    return {user,getUser}
})