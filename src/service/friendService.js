import axios from '../apis/axios'
import { jwtDecode } from 'jwt-decode'

class FriendService {
  constructor(api) {
    this.api = api
  }
  async getFriends() {
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)

    return this.api.get(`/users/${decodedToken.sub}/friends`, {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    })
  }

  async getFriendsByUser(userId, page = 1, perPage = 6) {
    const token = localStorage.getItem('token')
    return this.api.get(`/users/${userId}/friends`, {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      },
      params: {
        page: page,
        perPage: perPage
      }
    })
  }

  async getFriendship(userId) {
    const token = localStorage.getItem('token')
    return this.api.get(`/friendships/${userId}`, {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    })
  }

  async getFriendRequests(page = 1, perPage = 5) {
    const token = localStorage.getItem('token')
    return this.api.get('/friendships/requests', {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      },
      params : {
        page : page,
        perPage : perPage
      }
    })
  }

  async unfriend(friendId) {
    const token = localStorage.getItem('token')
    return this.api.post(
      '/friendships/delete',
      {
        friend_id: friendId
      },
      {
        headers: {
          'Content-Type': 'application/json', // Set content type if needed
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  async sendRequest(friendId) {
    const token = localStorage.getItem('token')
    return this.api.post(
      '/friendships',
      {
        to_user_id: friendId
      },
      {
        headers: {
          'Content-Type': 'application/json', // Set content type if needed
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  async accept(friendshipId) {
    const token = localStorage.getItem('token')
    return this.api.post(
      `/friendships/${friendshipId}`,
      {
        _method: 'patch'
      },
      {
        headers: {
          'Content-Type': 'application/json', // Set content type if needed
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  async getMutualFriends(userId, page = 1, perPage = 6) {
    const token = localStorage.getItem('token')
    return this.api.get(`/friendships/mutual/${userId}`, {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      },
      params: {
        page: page,
        perPage: perPage
      }
    })
  }
}

const friendService = new FriendService(axios)
export { friendService }
