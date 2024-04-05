import axios from '../apis/axios'

class GroupService {
  constructor(api) {
    this.api = api
  }

  async getGroupByUser(userId, page = 1, perPage = 15) {
    const endpoint = `/users/${userId}/groups`
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
}

const groupService = new GroupService(axios)
export { groupService }
