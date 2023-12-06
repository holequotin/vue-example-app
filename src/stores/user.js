import {ref} from 'vue'
import { defineStore } from 'pinia'
import { apiService } from '../service/apiService'

export const useUserStore = defineStore('user',() => {
    const user = ref({})
    function getUser() {
        const token = localStorage.getItem('token')
        user.value = apiService.getUser(token)
    }
    return {user,getUser}
})