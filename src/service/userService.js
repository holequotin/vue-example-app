import axios from '../apis/axios'
class UserService {
    constructor(api) {
        this.api = api
    }
    async getUser() {
        const data = {}
        const token = localStorage.getItem('token')
        const config = {
            headers : {
                'Content-Type': 'application/json', // Set content type if needed
                'Authorization': `Bearer ${token}`
            }
        }
        return this.api.post('/auth/me',data,config)
    }
    async login(data) {
        const endpoint = '/auth/login'
        return this.api.post(endpoint,data)
    }
    async register(data) {
        const endpoint = '/auth/register'
        return this.api.post(endpoint,data)
    }
    async logout() {
        const data = {}
        const endpoint = '/auth/logout'
        const token = localStorage.getItem('token')
        const config = {
            headers : {
                'Content-Type': 'application/json', // Set content type if needed
                'Authorization': `Bearer ${token}`
            }
        }
        return this.api.post(endpoint,data,config)
    }
}
const userService = new UserService(axios)
export {userService}