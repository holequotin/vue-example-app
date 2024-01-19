import axios from '../apis/axios'
class PostService {
    constructor(api) {
        this.api = api
    }
    async getAllPost() {
        return this.api.get('/posts')
    }
    async getPostByUser(userId) {
        return this.api.get('/posts', {
            params : {
                user_id : userId
            }
        })
    }
    async storePost(data) {
        const token = localStorage.getItem('token')
        return this.api.post('/posts',data,{
            headers : {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}
const postService = new PostService(axios)
export {postService}