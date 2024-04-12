import Pusher from 'pusher-js'

const token = localStorage.getItem('token')
const pusher = new Pusher('59f15dafc25b0682704d', {
  cluster: 'ap1',
  channelAuthorization: {
    endpoint: 'http://localhost:8000/broadcasting/auth',
    transport: 'jsonp',
    'params': {
      token: token
    }
  }
})

export default pusher
