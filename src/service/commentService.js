import axios from '../apis/axios'
class CommentService {
  constructor(api) {
    this.api = api
  }
  async getCommentByPost(postId, page=1, perPage=4) {
    const token = localStorage.getItem('token')
    return this.api.get(`/posts/${postId}/comments`, {
      params: {
        page: page,
        perPage: perPage
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
  async deleteComment(commentId) {
    const token = localStorage.getItem('token')
    return this.api.delete(`/comments/${commentId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }
  async updateComment(commentId, data) {
    const token = localStorage.getItem('token')
    data._method = 'PATCH'
    console.log('data in service',data)
    return this.api.post(`/comments/${commentId}`, data, {
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
