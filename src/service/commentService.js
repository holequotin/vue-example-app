import axios from '../apis/axios'
class CommentService {
  constructor(api) {
    this.api = api
  }
  async getCommentByPost(postId) {
    const token = localStorage.getItem('token')
    return this.api.get('/comments', {
      params: {
        post_id: postId
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }
  async storeComment(data) {
    const token = localStorage.getItem('token')
    return this.api.post('/comments', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
  }
}
const commentService = new CommentService(axios)
export { commentService }
