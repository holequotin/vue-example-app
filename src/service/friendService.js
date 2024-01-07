import axios from '../apis/axios'

class FriendService {
    constructor (api) {
        this.api = api;
    }
    async getFriends(token) {
        const data = {}
        const endpoint = '/friends'
        const config = {
            headers : {
                'Content-Type': 'application/json', // Set content type if needed
                'Authorization': `Bearer ${token}`
            }
        }
        return this.api.post(endpoint,data,config)
    }
}

const friendService = new FriendService(axios)
export {friendService}