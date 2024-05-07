import axios from '@/apis/axios'

class GroupInvitationService {
  constructor(api) {
    this.api = api
  }

  async replyGroupInvitation(invitationId, data) {
    data._method = 'patch'
    const endpoint = `invitations/${invitationId}/reply`
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

const groupInvitationService = new GroupInvitationService(axios)
export { groupInvitationService }