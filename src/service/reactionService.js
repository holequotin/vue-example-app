import axios from '../apis/axios'

class ReactionService {
  constructor(api) {
    this.api = api
  }
  async removeReaction(postId) {
    const endpoint = '/reactions'
    const token = localStorage.getItem('token')
    return this.api.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      },
      data: {
        post_id: postId
      }
    })
  }
  async updateReaction(postId, reactionType) {
    const endpoint = '/reactions'
    const token = localStorage.getItem('token')
    return this.api.patch(
      endpoint,
      {
        post_id: postId,
        type: reactionType
      },
      {
        headers: {
          'Content-Type': 'application/json', // Set content type if needed
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  async storeReaction(postId, reactionType) {
    const endpoint = '/reactions'
    const token = localStorage.getItem('token')
    return this.api.post(
      endpoint,
      {
        post_id: postId,
        type: reactionType
      },
      {
        headers: {
          'Content-Type': 'application/json', // Set content type if needed
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}

const reactionService = new ReactionService(axios)
export { reactionService }
