<script setup>
import { ref, watch } from 'vue'
import { errorHandler } from '@/utils/errorHandler'
import { groupChatService } from '@/service/groupChatService'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'
import { checkURL } from '@/utils/fileUtils'

const usersCanAdd = ref([])
const perPage = ref(15)
const props = defineProps(['id'])
const users = ref([])
const dialog = ref(false)
const alertStore = useAlertStore()
const metaCanAdd = ref({
  last_page: 1,
  current_page: 0
})

async function getUsersCanAdd(page = 1, perPage = 15) {
  groupChatService.getUsersCanAdd(props.id, page, perPage)
    .then(response => {
      usersCanAdd.value.push(...response.data.data)
      metaCanAdd.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function loadUserCanAdd({ done }) {
  if (metaCanAdd.value.current_page < metaCanAdd.value.last_page) {
    await getUsersCanAdd(usersCanAdd.value.length / perPage.value + 1, perPage.value - (usersCanAdd.value.length % perPage.value))
  }
  if (metaCanAdd.value.current_page === metaCanAdd.value.last_page) done('empty')
  else {
    done('ok')
  }
}

function addUsers() {
  const data = {
    'group_chat_id': props.id,
    'users': users.value
  }

  groupChatService.addUsers(data)
    .then(response => {
      alertStore.showAlert('Add users successfully', MessageType.SUCCESS)
      dialog.value = false
    })
    .catch(error => {
      errorHandler(error)
    })
}

function reset() {
  usersCanAdd.value = []
  users.value = []
  metaCanAdd.value = {
    last_page: 1,
    current_page: 0
  }
}

watch(dialog, () => {
  if (dialog.value === true) {
    getUsersCanAdd(usersCanAdd.value.length / perPage.value + 1, perPage.value - (usersCanAdd.value.length % perPage.value))
  } else {
    reset()
  }
})

</script>

<template>
  <v-btn
    color="primary"
    icon="mdi-account-multiple-plus"
    variant="text"
    @click="dialog = true"
  ></v-btn>
  <v-dialog v-model="dialog" max-width="500">
    <v-card title="Add users">
      <v-card-item>
        <h2>Users</h2>
        <div>
          <v-list>
            <v-infinite-scroll mode="manual" @load="loadUserCanAdd">
              <v-list-item v-for="user in usersCanAdd" :key="user">
                <template #prepend>
                  <v-avatar :size="50" class="ma-2" color="red" v-bind="props">
                    <v-img v-if="checkURL(user.avatar)" :src="user.avatar" alt="John"></v-img>
                    <span v-else class="text-h5">{{ user.name[0] }}</span>
                  </v-avatar>
                </template>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <template #append>
                  <v-checkbox v-model="users" :value="user.id"></v-checkbox>
                </template>
              </v-list-item>

              <template v-slot:load-more="{ props }">
                <v-btn
                  icon="mdi-refresh"
                  size="small"
                  v-bind="props"
                  variant="text"
                ></v-btn>
              </template>
            </v-infinite-scroll>
          </v-list>
        </div>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          block
          color="primary"
          text="Add User"
          @click="addUsers"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>