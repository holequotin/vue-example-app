<script setup>
import { ref, watch } from 'vue'
import { groupChatService } from '@/service/groupChatService'
import { errorHandler } from '@/utils/errorHandler'
import { checkURL } from '@/utils/fileUtils'
import { useUserStore } from '@/stores/user'
import { GroupChatRole } from '@/utils/GroupChatRole'
import { useToast } from 'vue-toastification'

const members = ref([])
const perPage = ref(15)
const props = defineProps(['id'])
const userStore = useUserStore()
const toast = useToast()
const dialog = ref(false)
const meta = ref({
  current_page: 0,
  last_page: 1
})

async function getGroupChatUsers() {
  groupChatService.getGroupChatUsers(props.id, meta.value.current_page + 1, perPage.value)
    .then(response => {
      members.value.push(...response.data.data)
      meta.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function load({ done }) {
  await getGroupChatUsers()
  if (meta.value.current_page === meta.value.last_page) done('empty')
  else {
    done('ok')
  }
}

watch(dialog, () => {
  if (dialog.value === true) {
    members.value = []
    meta.value = {
      current_page: 0,
      last_page: 1
    }
    getGroupChatUsers()
  } else {
    members.value = []
    meta.value = {
      current_page: 0,
      last_page: 1
    }
  }
})

function removeUser(groupChatUserId) {
  groupChatService.removeUser(groupChatUserId)
    .then(response => {
      removeInMembers(groupChatUserId)
      toast.success(response.data.message)
    })
    .catch(error => errorHandler(error))
}

function updateRole(groupChatUserId, role) {
  const data = {
    role: role
  }

  groupChatService.setRole(groupChatUserId, data)
    .then(response => {
      toast.success(response.data.message)
      updateRoleInMembers(groupChatUserId, role)
    })
    .catch(error => errorHandler(error))
}

function removeInMembers(groupChatUserId) {
  members.value = members.value.filter((item) => {
    return item.id !== groupChatUserId
  })
}

function updateRoleInMembers(groupChatUserId, role) {
  members.value = members.value.map((item) => {
    if (item.id === groupChatUserId) return { ...item, role: role }
    return item
  })
}

</script>

<template>
  <div>

  </div>
  <v-btn
    color="primary"
    icon="mdi-account-group-outline"
    text="Open Dialog"
    variant="text"
    @click="dialog = true"
  ></v-btn>
  <v-dialog v-model="dialog" max-width="500">
    <v-card title="Members">
      <v-card-item>
        <v-infinite-scroll mode="manual" @load="load">
          <v-list>
            <v-list-item v-for="member in members" :key="member">
              <template #prepend>
                <v-avatar :size="50" class="ma-2" color="red" v-bind="props">
                  <v-img v-if="checkURL(member.user.avatar)" :src="member.user.avatar" alt="John"></v-img>
                  <span v-else class="text-h5">{{ member.user.name[0] }}</span>
                </v-avatar>
              </template>
              <v-list-item-title>{{ member.user.name }}
                <v-chip v-if="member.role === GroupChatRole.ADMIN" color="green">
                  Admin
                </v-chip>
              </v-list-item-title>
              <template #append>
                <v-menu
                  v-if="userStore.user?.id !== member.user.id && member.permissions.delete && member.permissions.update">
                  <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                  </template>

                  <v-list>
                    <v-list-item v-if="member.permissions.delete"
                                 prepend-icon="mdi-account-remove-outline"
                                 @click="removeUser(member.id)"
                    >
                      <v-list-item-title>Remove</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="member.permissions.update && member.role === GroupChatRole.MEMBER"
                                 prepend-icon="mdi-security"
                                 @click="() => updateRole(member.id, GroupChatRole.ADMIN)"
                    >
                      <v-list-item-title>Set as admin</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="member.permissions.update && member.role === GroupChatRole.ADMIN"
                                 prepend-icon="mdi-account"
                                 @click="() => updateRole(member.id, GroupChatRole.MEMBER)"
                    >
                      <v-list-item-title>Set as member</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-list-item>
          </v-list>
        </v-infinite-scroll>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>