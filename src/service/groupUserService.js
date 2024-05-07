import axios from '@/apis/axios'

class GroupUserService {
  constructor(api) {
    this.api = api
  }

  async setShowPostType(groupId, userId, data) {
    const endpoint = `/groups/${groupId}/show-type/${userId}`
    const token = localStorage.getItem('token')

    data._method = 'patch'

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.post(endpoint, data, config)
  }
}

const groupUserService = new GroupUserService(axios)
export { groupUserService }