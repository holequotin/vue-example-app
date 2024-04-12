import axios from '../apis/axios'

class ReactionService {
  constructor(api) {
    this.api = api
  }

  async getReactionsByPost(postId, type = null, page=1, perPage=5) {
    const endpoint = `/posts/${postId}/reactions`
    const token = localStorage.getItem('token')
    return this.api.get(endpoint, {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      },
      params : {
        page: page,
        perPage: perPage,
        type: type
      }
    })
  }

  async removeReaction(reactionId) {
    const endpoint = `/reactions/${reactionId}`
    const token = localStorage.getItem('token')
    return this.api.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      },
    })
  }
  async updateReaction(reactionId, reactionType) {
    const endpoint = `/reactions/${reactionId}`
    const token = localStorage.getItem('token')
    return this.api.patch(
      endpoint,
      {
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
