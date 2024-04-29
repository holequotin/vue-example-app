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

  async searchGroup(name, page = 1, perPage = 20) {
    const endpoint = '/groups'
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      params: {
        name: name,
        page: page,
        perPage: perPage
      }
    }
    return this.api.get(endpoint, config)
  }

  async getGroupBySlug(slug) {
    const endpoint = `/groups/${slug}`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.get(endpoint, config)
  }

  async getPostsInGroup(id, page = 1, perPage = 10) {
    const endpoint = `/groups/${id}/posts`
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

  async joinGroup(id) {
    const endpoint = `/groups/${id}/join`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.post(endpoint, {}, config)
  }

  async leaveGroup(id) {
    const endpoint = `/groups/${id}/leave`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.post(endpoint, {}, config)
  }

  async getJoinStatus(id) {
    const endpoint = `/groups/${id}/join-status`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.get(endpoint, config)
  }

  async getMembers(id, page = 1, perPage = 8) {
    const endpoint = `/groups/${id}/users`
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

  async sendRequest(id) {
    const endpoint = `/groups/${id}/request`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.post(endpoint, {}, config)
  }

  async getJoinGroupRequests(page = 1, perPage = 15) {
    const endpoint = `/groups/request`
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

  async accept(groupId, userId) {
    const endpoint = `groups/${groupId}/accept/${userId}`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.patch(endpoint, {}, config)
  }

  async remove(groupId, userId) {
    const endpoint = `groups/${groupId}/remove/${userId}`
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }

    return this.api.delete(endpoint, config)
  }

  async createGroup(data) {
    const endpoint = 'groups'
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

  async updateGroup(id, data) {
    data._method = 'patch'
    const endpoint = `groups/${id}`
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

  async getGroupPosts(page = 1, perPage = 15) {
    const endpoint = `groups/feed`
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
}

const groupService = new GroupService(axios)
export { groupService }
