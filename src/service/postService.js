import axios from '../apis/axios'
class PostService {
  constructor(api) {
    this.api = api
  }
  async getAllPost(page = 1, perPage = 5) {
    const token = localStorage.getItem('token')
    console.log(
      this.api.get('/posts', {
        params: {
          page: page,
          perPage: perPage
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
    )
    return this.api.get('/posts', {
      params: {
        page: page,
        perPage: perPage
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
  }
  async getPostsByUser(userId, page = 1, perPage = 5) {
    const token = localStorage.getItem('token')
    return this.api.get(`/users/${userId}/posts`, {
      params: {
        page: page,
        perPage: perPage
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
  }
  async storePost(data) {
    const token = localStorage.getItem('token')
    return this.api.post('/posts', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
  }

  async deletePost(postId) {
    const token = localStorage.getItem('token')
    return this.api.delete(`/posts/${postId}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
  }

  async updatePost(postId, data) {
    const token = localStorage.getItem('token')
    data._method = 'patch'
    return this.api.post(`/posts/${postId}`,data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
    })
  }
}
const postService = new PostService(axios)
export { postService }
