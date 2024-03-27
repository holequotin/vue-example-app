import axios from '../apis/axios'
class UserService {
  constructor(api) {
    this.api = api
  }
  async getUser() {
    const data = {}
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    }
    return this.api.post('/auth/me', data, config)
  }
  async getUserById(userId) {
    const endpoint = `/users/${userId}`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    }
    return this.api.get(endpoint, config)
  }
  async getUserByToken(token) {
    const data = {}
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    }
    return this.api.post('/auth/me', data, config)
  }
  async login(data) {
    const endpoint = '/auth/login'
    return this.api.post(endpoint, data)
  }
  async register(data) {
    const endpoint = '/auth/register'
    return this.api.post(endpoint, data)
  }
  async resetPassword(token, password, password_confirmation) {
    const data = {
      password: password,
      password_confirmation: password_confirmation
    }
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    }
    const endpoint = '/auth/reset_password'
    return this.api.post(endpoint, data, config)
  }

  async changePassword(data) {
    data._method = 'patch'
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    }
    const endpoint = '/users/change_password'
    return this.api.post(endpoint,data,config);
  }

  async logout() {
    const data = {}
    const endpoint = '/auth/logout'
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    }
    return this.api.post(endpoint, data, config)
  }

  async update(data) {
    data._method = 'patch'
    const endpoint = '/users'
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set content type if needed
        Authorization: `Bearer ${token}`
      }
    }

    return this.api.post(endpoint, data, config)
  }

  async uploadAvatar(data) {
    data._method = 'patch'
    const endpoint = 'users/avatar'
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.post(endpoint,data,config)
  }
}
const userService = new UserService(axios)
export { userService }
