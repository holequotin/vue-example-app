<script setup>

import { checkURL } from '@/utils/fileUtils'
import BaseLayout from '@/views/base/BaseLayout.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import { computed, ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import GroupButton from '@/components/group/GroupButton.vue'
import NewPostCard from '@/components/home/feed/NewPostCard.vue'
import PostCard from '@/components/home/feed/PostCard.vue'

const route = useRoute()
const group = ref({
  'id': 3,
  'name': 'Kristopher Mitchell',
  'url': 'http://localhost:8000/storage/',
  'type': '1',
  'created_at': '2024-04-08T01:33:32.000000Z',
  'updated_at': '2024-04-08T01:33:32.000000Z'
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
  getGroup(route.params.id)
  getPosts(route.params.id)
  getStatus(route.params.id)
  getMembers(route.params.id)
})

function getGroup(id) {
  groupService.getGroupById(id)
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
</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main style="min-height: 300px">
        <v-card class="d-flex justify-center" max-height="500px">
          <v-container grid-list-xs fluid class="d-flex justify-start align-center flex-column">
            <v-img min-width="70%" max-height="70%" aspect-ratio="16/9" cover height="500px"
                   src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
            <v-container class="d-flex justify-space-around" style="width: 90%;">
              <div class="d-flex justify-start">
                <v-avatar color="red" size="150" style="margin-top : -100px;">
                  <v-img v-if="checkURL(group.url)" :src="group.url" cover></v-img>
                  <span v-else class="text-h5">{{ group.name ? group.name[0] : 'A' }}</span>
                </v-avatar>
                <h1 style="margin-left: 20px;">{{ group.name }}</h1>
              </div>
              <div class="d-flex justiy-start">
                <GroupButton :status="status" :group="group" @done="() => getStatus(group.id)"></GroupButton>
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
            <NewPostCard :group="group"></NewPostCard>
            <PostCard v-for="post in posts" :key="post" :post="post" type="feed"></PostCard>

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
                <v-col cols="6" v-for="member in members" :key="member.id" class="d-flex justify-start">
                  <v-card width="100%" class="mb-5" v-for="user in members" :key="user.id">
                    <template v-slot:prepend>
                      <div class="d-flex justify-start">
                        <v-avatar color="blue-darken-2" size="large">
                          <v-img v-if="checkURL(user.avatar)" alt="John" :src="user.avatar"></v-img>
                          <span v-else class="text-h5">{{ user.name[0].toUpperCase() }}</span>
                        </v-avatar>
                        <div class="ml-3">
                          <RouterLink :to="{ name: 'profile-parent', params: { id: user.id } }" style="color: white;">
                            <v-card-title>{{ user.name }}</v-card-title>
                          </RouterLink>
                        </div>
                      </div>
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