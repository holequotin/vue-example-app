import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'
import { groupService } from '@/service/groupService'

export const useSearchStore = defineStore('search', () => {
  const users = ref([])
  const groups = ref([])
  const type = ref('users')

  const meta = ref({
    last_page: 1
  })

  function reset() {
    users.value = []
    groups.value = []
    meta.value = {
      last_page: 1
    }
  }

  async function searchUsers(name, page = 1, perPage = 20) {
    userService.searchUser(name, page, perPage)
      .then((response) => {
        meta.value = response.data.meta
        users.value = response.data.data
      })
      .catch((error) => {
        errorHandler(error)
      })
  }

  async function searchGroups(name, page = 1, perPage = 20) {
    groupService.searchGroup(name, page, perPage)
      .then((response) => {
        meta.value = response.data.meta
        groups.value = response.data.data
      })
      .catch((error) => {
        errorHandler(error)
      })
  }

  return { users, groups, type, meta, reset, searchUsers, searchGroups }
})
