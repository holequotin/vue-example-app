import axios from '../apis/axios'
class APIService {
    constructor(api) {
        this.api = api
    }
    async getUser(token) {
        const data = {}
        const config = {
            header : {
                Authorization : `Bearer ${token}`
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
}
const apiService = new APIService(axios)
export {apiService}