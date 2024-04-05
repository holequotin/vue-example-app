import axios from '../apis/axios'

class NotificationService {
  constructor(api) {
    this.api = api
  }

  async getNotifications(page = 1, perPage = 5) {
    const endpoint = '/notifications'
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      params: {
        page: page,
        perPage: perPage
      }
    }
    return this.api.get(endpoint, config)
  }

  async markAsRead(notificationId) {
    const endpoint = `/notifications/${notificationId}`
    const token = localStorage.getItem('token')
    const data = {
      _method : 'patch'
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }

    return this.api.post(endpoint, data, config)
  }

  async markAllAsRead() {
    const endpoint = '/notifications'
    const token = localStorage.getItem('token')
    const data = {
      _method : 'patch'
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }

    return this.api.post(endpoint,data,config)
  }
}

const notificationService = new NotificationService(axios)
export { notificationService }
