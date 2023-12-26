import axios from '../apis/axios'
class PostService {
    constructor(api) {
        this.api = api
    }
    async getAllPost() {
        return this.api.get('/posts')
    }
}
const postService = new PostService(axios)
export {postService}