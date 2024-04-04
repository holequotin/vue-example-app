import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'

export const useSearchStore = defineStore('search', () => {
  const users = ref([])
  const meta = ref(null)
  const currentPage = ref(0)

  function $reset() {
    users.value = []
    meta.value = null
    currentPage.value = 0
  }

  async function searchUsers(name) {
    const isNotLastPage = currentPage.value < meta.value?.last_page
    const isNotStartLoad = currentPage.value === 0
    const hasSearchValue = !!name
    console.table({
      'isNotLastPage': isNotLastPage,
      'isNotStartLoad': isNotStartLoad,
      'hasSearchValue': hasSearchValue
    })
    if ((isNotLastPage || isNotStartLoad) && hasSearchValue) {
      userService.searchUser(name, currentPage.value + 1, 20)
        .then((response) => {
          meta.value = response.data.meta
          currentPage.value = meta.value.current_page
          users.value.push(...response.data.data)
        })
        .catch((error) => {
          errorHandler(error)
        })
    }
  }
  return {users, $reset, searchUsers}
})
