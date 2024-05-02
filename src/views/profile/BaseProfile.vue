<template>
  <v-infinite-scroll :onLoad="load">
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
                  <v-btn outline color="primary" dark v-if="currUserId == userStore.user.id"
                         variant="outlined" @click="editAvatar = true">Edit avatar
                  </v-btn>
                  <EditAvatarDialiog v-if="editAvatar" @toggle="editAvatar = !editAvatar" @after="changed"
                                     :dialog="editAvatar">
                  </EditAvatarDialiog>
                  <v-avatar color="red" size="150" style="margin-top : -100px;">
                    <v-img v-if="checkURL(user.avatar)" :src="user.avatar" cover></v-img>
                    <span v-else class="text-h5">{{ user.name ? user.name[0] : 'A' }}</span>
                  </v-avatar>
                  <h1 style="margin-left: 20px;">{{ user.name }}</h1>
                  <h1 v-if="nickname" class="ml-3">({{ nickname }})</h1>
                </div>
                <div class="d-flex justiy-start">
                  <div v-if="userStore.user.id != currUserId" class="d-flex justify-start">
                    <FriendButton :friendship="friendship"
                                  @accept="accept" @cancel="cancel" @refuse="refuse" @send="sendRequest"
                                  @unfriend="unfriend"></FriendButton>
                    <v-btn class="ml-2" color="primary" prepend-icon="mdi-facebook-messenger" @click="toMessage">
                      Message
                    </v-btn>
                  </div>
                  <v-btn v-else color="primary" dark outline variant="outlined" @click="edit = true">Edit profile
                  </v-btn>
                  <ProfileDialog :dialog="edit" @toggle="edit = !edit" @after="getUser"></ProfileDialog>
                </div>
              </v-container>
              <v-divider></v-divider>
              <v-container grid-list-xs style="width: 70%;"
                           class="d-flex flex-row justify-start align-center">
                <RouterLink :to="{ name: 'profile-parent', params: { id: $route.params.id } }">
                  <v-btn
                    color="primary" variant="plain">Posts
                  </v-btn>
                </RouterLink>
                <RouterLink :to="{ name: 'profile-friend', params: { id: $route.params.id } }">
                  <v-btn
                    color="primary" variant="plain">Friends
                  </v-btn>
                </RouterLink>
                <RouterLink :to="{ name: 'profile-group', params: { id: $route.params.id } }">
                  <v-btn
                    color="primary" variant="plain">Groups
                  </v-btn>
                </RouterLink>
              </v-container>
            </v-container>
          </v-card>
          <slot name="content" :friends="friends">
            <v-container class="d-flex flex-row" grid-list-xs style="width: 60%;">
              <v-row>
                <v-col>
                  <NewPostCard v-if="userStore.user?.id === user?.id" width="100%"></NewPostCard>
                  <PostCard v-for="post in postStore.posts" type="feed" :post="post" :key="post.id"
                            @deleted="() => postStore.deletePost(post.id)">
                  </PostCard>
                </v-col>
              </v-row>
            </v-container>
          </slot>
        </v-main>
      </template>
      <template #left-drawer>
        <div>

        </div>
      </template>
      <template #right-drawer>
        <div></div>
      </template>
    </BaseLayout>
  </v-infinite-scroll>
</template>

<script setup>
import BaseLayout from '../base/BaseLayout.vue'
import AppBar from '../../components/home/appbar/AppBar.vue'
import FriendButton from '../../components/profile/FriendButton.vue'
import NewPostCard from '../../components/home/feed/NewPostCard.vue'
import PostCard from '../../components/home/feed/PostCard.vue'
import { computed, provide, ref, watchEffect } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { userService } from '@/service/userService'
import { friendService } from '@/service/friendService'
import { useUserStore } from '@/stores/user'
import { useAlertStore } from '@/stores/alert'
import { usePostStore } from '@/stores/post'
import { errorHandler } from '@/utils/errorHandler'
import { MessageType } from '@/utils/MessageType'
import ProfileDialog from '../../components/profile/ProfileDialog.vue'
import EditAvatarDialiog from '../../components/profile/EditAvatarDialiog.vue'
import { checkURL } from '@/utils/fileUtils'

const route = useRoute()
const router = useRouter()
const currUserId = ref(1)
const test = ref('Hello')
const friends = ref([])
const postStore = usePostStore()
const userStore = useUserStore()
const friendship = ref(null)
const user = ref({})
const edit = ref(false)
const editAvatar = ref(false)
const alertStore = useAlertStore()
provide('friends', friends)
provide('test', test)

watchEffect(() => {
  currUserId.value = route.params.id
  postStore.$reset()
  userStore.getUser()
  getUser()
  getFriendship()
})

const nickname = computed(() => {
  if (friendship.value) {
    if (friendship.value.from_user.id === userStore.user.id) {
      return friendship.value.to_user_nickname
    }
    return friendship.value.from_user_nickname
  }
  return null
})

function getUser() {
  userService.getUserById(currUserId.value)
    .then((response) => {
      user.value = response.data
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function getFriendship() {
  friendService.getFriendship(currUserId.value)
    .then((response) => {
      console.log(response.data)
      friendship.value = response.data
    })
    .catch((error) => {
      friendship.value = null
      console.log(error)
    })
}

function unfriend() {
  friendService.unfriend(currUserId.value)
    .then((response) => {
      console.log(response.data)
      alertStore.showAlert('Unfriend successfully', MessageType.SUCCESS)
      getFriendship()
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function sendRequest() {
  friendService.sendRequest(currUserId.value)
    .then((response) => {
      console.log(response.data)
      alertStore.showAlert('Send friend request successfully', MessageType.SUCCESS)
      getFriendship()
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function accept() {
  friendService.accept(friendship.value.id)
    .then((response) => {
      console.log(response.data)
      alertStore.showAlert('Accepted', MessageType.SUCCESS)
      getFriendship()
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function cancel() {
  friendService.unfriend(currUserId.value)
    .then((response) => {
      console.log(response.data)
      alertStore.showAlert('Cancel', MessageType.SUCCESS)
      getFriendship()
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function refuse() {
  friendService.unfriend(currUserId.value)
    .then((response) => {
      console.log(response.data)
      alertStore.showAlert('Refuse', MessageType.SUCCESS)
      getFriendship()
    })
    .catch((error) => {
      errorHandler(error)
    })
}

async function load({ done }) {
  await postStore.getPostsByUser(currUserId.value)
  done('empty')
}

function changed() {
  postStore.getPostsByUser(currUserId.value)
  getUser()
  userStore.getUser()
}

function toMessage() {
  router.push({ name: 'chat', params: { id: route.params.id } })
}

</script>
