import axios from '../apis/axios'

class MessageService {
  constructor(api) {
    this.api = api
  }

  async getMessages(id, page, perPage) {
    const endpoint = `/messages/${id}`
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
    const endpoint = `/messages`
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

const messageService = new MessageService(axios)
export { messageService }