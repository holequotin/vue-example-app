<script setup>

import { checkURL } from '@/utils/fileUtils'
import BaseLayout from '@/views/base/BaseLayout.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import GroupButton from '@/components/group/GroupButton.vue'
import NewPostCard from '@/components/home/feed/NewPostCard.vue'
import PostCard from '@/components/home/feed/PostCard.vue'
import EditGroupDialog from '@/components/group/EditGroupDialog.vue'
import { useUserStore } from '@/stores/user'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'
import { GroupRole } from '@/utils/GroupRole'
import { ShowPostType } from '@/utils/ShowPostType'
import { groupUserService } from '@/service/groupUserService'

const route = useRoute()
const userStore = useUserStore()
const alertStore = useAlertStore()
const group = ref({
  'id': 3,
  'name': 'Kristopher Mitchell',
  'url': 'http://localhost:8000/storage/',
  'type': '1',
  'admins': [],
  'created_at': '2024-04-08T01:33:32.000000Z',
  'updated_at': '2024-04-08T01:33:32.000000Z',
  'owner': {
    'id': 21,
    'name': 'Alene Klein',
    'email': 'heaney.fletcher@example.org',
    'avatar': 'http://localhost:8000/storage/avatars/21/zBocVFF3Govgm9cFeQc4JFnIcdPPvf2weP8wlDzU.png'
  }
})

const isAdmin = computed(() => {
  return group.value.admins.find(item => item.id == userStore.user?.id)
})

const roleItems = ref([
  { title: 'Member', value: GroupRole.MEMBER },
  { title: 'Admin', value: GroupRole.ADMIN }
])

const typeItems = ref([
  { title: 'All', value: ShowPostType.ALL },
  { title: 'Partial', value: ShowPostType.PARTIAL }
])

const groupType = computed(() => {
  if (group.value.type === '1') return 'Public group'
  return 'Private group'
})

const dialog = ref(false)
const roleDialog = ref(false)
const showTypeDialog = ref(false)
const role = ref({
  id: 1,
  value: GroupRole.ADMIN
})

const showType = ref({
  id: 1,
  value: ShowPostType.ALL
})
const page = ref(1)
const meta = ref({
  last_page: 1
})

const members = ref([])
const pageMember = ref(1)
const metaMember = ref({
  last_page: 1
})

const status = ref(null)
const show = ref('posts')
const posts = ref([])
const canShowPost = computed(() => {
  return status.value === '1'
})

watchEffect(() => {
  getGroup(route.params.slug)
})

watch([group, roleDialog, showTypeDialog], function() {
  getPosts(group.value.id)
  getStatus(group.value.id)
  getMembers(group.value.id)

  if (roleDialog.value === false) {
    role.value = {
      id: 1,
      value: GroupRole.MEMBER
    }
  }

  if (showTypeDialog.value === false) {
    showType.value = {
      id: 1,
      value: ShowPostType.ALL
    }
  }
})

async function getGroup(slug) {
  groupService.getGroupBySlug(slug)
    .then((response) => {
      group.value = response.data
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function getPosts(id) {
  groupService.getPostsInGroup(id, page, 10)
    .then((response) => {
      posts.value = response.data.data
      meta.value = response.data.meta
    })
    .catch((error) => {
      if (error.response.status === 403) {
        console.error(error)
      } else {
        errorHandler(error)
      }
    })
}

function getStatus(id) {
  groupService.getJoinStatus(id)
    .then((response) => {
      status.value = response.data.status
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function getMembers(id) {
  groupService.getMembers(id)
    .then((response) => {
      members.value = response.data.data
      metaMember.value = response.data.meta
    })
    .catch((error) => {
      console.error(error)
    })
}

function created() {
  page.value = 1
  getPosts(group.value.id)
}

async function edited() {
  await getGroup(route.params.slug)
}

function removeUser(groupId, userId) {
  groupService.remove(groupId, userId)
    .then(response => {
      alertStore.showAlert('Remove user successfully', MessageType.SUCCESS)
      getMembers(groupId)
    })
    .catch(error => {
      errorHandler(error)
    })
}

const showRoleDialog = (userId) => {
  role.value.id = userId
  roleDialog.value = true
}

const showPostTypeDialog = (userId) => {
  showType.value.id = userId
  showTypeDialog.value = true
}

const updateRole = (userId, newRole) => {
  members.value = members.value.map((item) => {
    if (item.user.id == userId) return { ...item, role: newRole }

    return item
  })
}

const setShowType = (groupId, userId) => {
  const data = {
    type: showType.value.value
  }
  groupUserService.setShowPostType(groupId, userId, data)
    .then(response => {
      alertStore.showAlert('Update show post type successfully', MessageType.SUCCESS)
      showTypeDialog.value = false
    })
    .catch(error => {
      errorHandler(error)
    })
}

const setRole = (groupId, userId) => {
  const data = {
    user_id: userId,
    role: role.value.value,
    _method: 'patch'
  }
  groupService.updateGroupRole(data, groupId)
    .then(response => {
      alertStore.showAlert(response.data.message, MessageType.SUCCESS)
      updateRole(userId, data.role)
      roleDialog.value = false
    })
    .catch(error => {
      errorHandler(error)
    })
}

</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main style="min-height: 300px">
        <EditGroupDialog v-if="dialog" :dialog="dialog" :group="group" @edited="edited"
                         @toggle="dialog = !dialog"></EditGroupDialog>
        <v-card class="d-flex justify-center" max-height="550px">
          <v-container grid-list-xs fluid class="d-flex justify-start align-center flex-column">
            <v-img min-width="70%" max-height="70%" aspect-ratio="16/9" cover height="500px"
                   src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
            <v-container class="d-flex justify-space-around" style="width: 90%;">
              <div class="d-flex justify-start">
                <v-avatar color="red" size="150" style="margin-top : -100px;">
                  <v-img v-if="checkURL(group.url)" :src="group.url" cover></v-img>
                  <span v-else class="text-h5">{{ group.name ? group.name[0] : 'A' }}</span>
                </v-avatar>
                <div>
                  <h1 style="margin-left: 20px;">{{ group.name }}</h1>
                  <v-chip style="margin-left: 20px;">
                    {{ groupType }}
                  </v-chip>
                </div>
              </div>
              <div class="d-flex justiy-start">
                <GroupButton :status="status" :group="group" @done="() => getStatus(group.id)"
                             @edit="dialog = true"></GroupButton>
              </div>
            </v-container>
            <v-divider></v-divider>
            <v-container grid-list-xs style="width: 70%;"
                         class="d-flex flex-row justify-start align-center">
              <v-btn
                color="primary" variant="plain" @click="show = 'posts'">Posts
              </v-btn>
              <v-btn
                color="primary" variant="plain"
                @click="show = 'members'"
              >Members
              </v-btn>
            </v-container>
          </v-container>
        </v-card>
        <v-container class="d-flex justify-center align-center" v-if="show === 'posts'">
          <div v-if="!canShowPost">
            <h1>Join group to show posts</h1>
          </div>
          <div v-else style="width: 70%">
            <NewPostCard :group="group" @created="created"></NewPostCard>
            <PostCard v-for="post in posts" :key="post" :post="post" type="feed"
                      @deleted="() => getPosts(group.id)" @edited="() => getPosts(group.id)"></PostCard>
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="meta.last_page"
                :total-visible="7"
                @update:model-value="() => getPosts(group.id)"
              ></v-pagination>
            </div>
          </div>
        </v-container>
        <v-container class="d-flex justify-center align-center" v-if="show === 'members'">
          <v-card style="width: 100%">
            <v-card-title>
              Members
            </v-card-title>
            <v-card-item>
              <v-row>
                <v-col v-for="member in members" :key="member" class="d-flex justify-start" cols="6">
                  <v-card width="100%">
                    <template v-slot:prepend>
                      <div class="d-flex justify-start">
                        <v-avatar color="blue-darken-2" size="large">
                          <v-img v-if="checkURL(member.user.avatar)" :src="member.user.avatar" alt="John"></v-img>
                          <span v-else class="text-h5">{{ member.user.name[0].toUpperCase() }}</span>
                        </v-avatar>
                        <div class="ml-3">
                          <RouterLink :to="{ name: 'profile-parent', params: { id: member.user.id } }"
                                      style="color: white;">
                            <v-card-title>{{ member.user.name }}</v-card-title>
                          </RouterLink>
                        </div>
                      </div>
                    </template>
                    <template #append>
                      <v-chip v-if="group.owner.id === member.user.id" color="green">
                        Owner
                      </v-chip>
                      <v-chip v-if="member.role == GroupRole.ADMIN" color="blue">
                        Admin
                      </v-chip>
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                          <v-list-item
                            v-if="(group.owner.id !== member.user.id && group.owner.id === userStore.user?.id)"
                            @click="() => showRoleDialog(member.user.id)">
                            <v-list-item-title>Set role</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            v-if="(group.owner.id !== member.user.id && group.owner.id === userStore.user?.id) || (isAdmin && group.owner.id !== member.user.id)"
                            @click="showPostTypeDialog(member.user.id)">
                            <v-list-item-title>Set show post type</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            v-if="(group.owner.id !== member.user.id && group.owner.id === userStore.user?.id) || (isAdmin && group.owner.id !== member.user.id)"
                            @click="removeUser(group.id, member.user.id)">
                            <v-list-item-title>Remove</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                  </v-card>
                </v-col>
              </v-row>
              <v-pagination
                v-model="pageMember"
                :length="metaMember.last_page"
                :total-visible="7"
                @update:model-value="() => getMembers(route.params.id)"
              ></v-pagination>
            </v-card-item>
          </v-card>
        </v-container>

        <v-dialog
          v-model="roleDialog"
          width="auto"
        >
          <v-card
            min-width="400"
            prepend-icon="mdi-update"
            title="Update role"
          >
            <v-form>
              <v-select v-model="role.value" :items="roleItems">

              </v-select>
            </v-form>
            <template v-slot:actions>
              <v-btn
                class="ms-auto"
                text="Ok"
                @click="() => setRole(group.id,role.id)"
              ></v-btn>
            </template>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="showTypeDialog"
          width="auto"
        >
          <v-card
            min-width="400"
            prepend-icon="mdi-update"
            title="Update role"
          >
            <v-form>
              <v-select v-model="showType.value" :items="typeItems">

              </v-select>
            </v-form>
            <template v-slot:actions>
              <v-btn
                class="ms-auto"
                text="Ok"
                @click="() => setShowType(group.id,showType.id)"
              ></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </v-main>
    </template>
    <template #left-drawer>
      <div></div>
    </template>
    <template #right-drawer>
      <div></div>
    </template>
  </BaseLayout>
</template>

<style scoped>

</style>