<script setup>

import ContactCard from '@/components/chat/ContactCard.vue'
import { ref, watch } from 'vue'
import { messageService } from '@/service/messageService'
import { errorHandler } from '@/utils/errorHandler'
import { useMessageStore } from '@/stores/message'
import GroupChatCard from '@/components/chat/GroupChatCard.vue'
import { friendService } from '@/service/friendService'
import { useUserStore } from '@/stores/user'
import { groupChatService } from '@/service/groupChatService'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'
import { checkURL } from '@/utils/fileUtils'

const perPage = ref(15)
const userStore = useUserStore()
const alertStore = useAlertStore()
const meta = ref({
  last_page: 1,
  current_page: 0
})
const groupChatName = ref('')
const users = ref([])
const metaCanAdd = ref({
  last_page: 1,
  current_page: 0
})
const dialog = ref(false)
const usersCanAdd = ref([])

const metaGroup = ref({
  last_page: 1,
  current_page: 0
})
const showPerson = ref(true)
const storeGroupChatErrors = ref({
  'message': 'The name field is required. (and 2 more errors)',
  'errors': {
    'name': [],
    'users.1': [],
    'users.2': []
  }
})

const messageStore = useMessageStore()

async function getLastMessages(page = 1, perPage = 2) {
  messageService.getLastMessages(page, perPage)
    .then(response => {
      messageStore.lastMessages.push(...response.data.data)
      meta.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function getGroupChats(page = 1, perPage = 2) {
  messageService.getGroupChats(page, perPage)
    .then(response => {
      messageStore.groupChats.push(...response.data.data)
      metaGroup.value = response.data.data
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function load({ done }) {
  if (showPerson.value) {
    if (meta.value.current_page < meta.value.last_page) {
      await getLastMessages(messageStore.lastMessages.length / perPage.value + 1, perPage.value - (messageStore.lastMessages.length % perPage.value))
    }
    if (meta.value.current_page === meta.value.last_page) done('empty')
    else {
      done('ok')
    }
  } else {
    if (metaGroup.value.current_page < metaGroup.value.last_page) {
      await getGroupChats(messageStore.groupChats.length / perPage.value + 1, perPage.value - (messageStore.groupChats.length % perPage.value))
    }

    if (metaGroup.value.current_page === metaGroup.value.last_page) done('empty')
    else {
      done('ok')
    }
  }
}

async function getUsersCanAdd(page = 1, perPage = 15) {
  friendService.getFriendsByUser(userStore.user?.id, page, perPage)
    .then(response => {
      usersCanAdd.value.push(...response.data.data)
      metaCanAdd.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

function storeGroupChat() {
  const data = {
    name: groupChatName.value,
    users: users.value
  }

  groupChatService.storeGroupChat(data)
    .then(response => {
      dialog.value = false
      messageStore.groupChats.push(response.data)
      metaCanAdd.value = {
        last_page: 1,
        current_page: 0
      }
      storeGroupChatErrors.value = {
        'message': 'The name field is required. (and 2 more errors)',
        'errors': {
          'name': [],
          'users.1': [],
          'users.2': []
        }
      }
      groupChatName.value = ''
      users.value = []
      alertStore.showAlert('Create group chat successfully', MessageType.SUCCESS)
    })
    .catch(error => {
      storeGroupChatErrors.value = error.response.data
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

messageStore.lastMessages = []
messageStore.groupChats = []
getLastMessages(meta.value.current_page, perPage.value)
getGroupChats(metaGroup.value.current_page, perPage.value)

watch(dialog, () => {
  if (dialog.value === false) {
    groupChatName.value = ''
    users.value = []
  }
})
</script>

<template>
  <v-navigation-drawer location="left" width="350">
    <v-btn color="primary" variant="text" @click="showPerson = true">Users</v-btn>
    <v-btn color="primary" variant="text" @click="showPerson = false">Groups</v-btn>
    <v-infinite-scroll mode="manual" @load="load">
      <v-list v-if="showPerson">
        <v-list-item v-for="messsage in messageStore.lastMessages" :key="messsage.id">
          <ContactCard :message="messsage"></ContactCard>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item>
          <v-btn block color="primary" prepend-icon="mdi-plus" variant="tonal" @click="dialog = true">Create group
            chat
          </v-btn>
        </v-list-item>
        <v-list-item v-for="groupChat in messageStore.groupChats" :key="groupChat.id">
          <GroupChatCard :group-chat="groupChat"></GroupChatCard>
        </v-list-item>
      </v-list>
    </v-infinite-scroll>
  </v-navigation-drawer>

  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      height="500px"
      min-width="500"
      title="Create group chat"
    >
      <v-card-item>
        <v-text-field v-model="groupChatName" label="Name" variant="outlined">

        </v-text-field>
      </v-card-item>
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
            </v-infinite-scroll>
          </v-list>
        </div>
      </v-card-item>
    </v-card>
    <v-btn
      block
      class="ms-auto"
      color="primary"
      text="Create"
      @click="storeGroupChat"
    ></v-btn>
  </v-dialog>
</template>

<style scoped>

</style>