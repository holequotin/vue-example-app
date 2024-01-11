import axios from '../apis/axios'
class CommentService {
    constructor(api) {
        this.api = api
    }
    async getCommentByPost(postId) {
        const token = localStorage.getItem('token');
        return this.api.get('/comments',{
            params : {
                'post_id' : postId
            },
            headers : {
                'Content-Type': 'application/json', // Set content type if needed
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
const commentService = new CommentService(axios)
export {commentService}