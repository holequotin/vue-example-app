import axios from '@/apis/axios'

class GroupChatService {
  constructor(api) {
    this.api = api
  }

  async getGroupChatById(groupChatId) {
    const endpont = `group-chat/${groupChatId}`
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.get(endpont, config)
  }

  async getMessage(id, page = 1, perPage = 15) {
    const endpoint = `group-chat-message/${id}`
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      params: {
        page: page,
        perPage: perPage
      }
    }

    return this.api.get(endpoint, config)
  }

  async storeMessage(data) {
    const endpoint = `/group-chat-message`
    const token = localStorage.getItem('token')

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

const groupChatService = new GroupChatService(axios)

export { groupChatService }