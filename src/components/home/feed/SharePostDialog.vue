<template>
  <BaseDialog :dialog="props.dialog" @toggle="$emit('toggle')" :width="600">
    <template #title>
            <span>
                Share post
            </span>
    </template>
    <template #content>
      <PostCard type="dialog" :post="post" width="100%" class="overflow-auto">
        <template #text>
          <v-textarea label="" variant="solo" auto-grow placeholder="What's your mind?"
                      v-model="newPostData.body"></v-textarea>
        </template>
        <template #image>
          <v-select :items="postType" density="compact" label="Type" v-model="newPostData.type"></v-select>
        </template>
      </PostCard>
    </template>
    <template #actions>
      <v-container grid-list-xs>
        <v-btn outline color="primary" dark block @click="sharePost">Share</v-btn>
      </v-container>
    </template>
  </BaseDialog>
</template>
<script setup>
import BaseDialog from './BaseDialog.vue'
import PostCard from './PostCard.vue'
import { postService } from '@/service/postService'
import { ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePostStore } from '@/stores/post'
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'

const props = defineProps(['dialog', 'id'])
const userStore = useUserStore()
const postStore = usePostStore()
const alertStore = useAlertStore()

const emits = defineEmits(['toggle'])

const postType = [
  { title: 'Public', value: "public" },
  { title: 'Friends', value: "friends" },
  { title: 'Private', value: "private" },
]
const newPostData = ref({
  body: null,
  type: "public",
  share_post_id : props.id,
})

const post = ref({
  id: -1,
  content: null,
  imgPath: null,
  user: {},
  reactions: [],
  comments: []
})
function sharePost() {
  const data = {
    body: newPostData.value.body ? newPostData.value.body : null,
    type: newPostData.value.type,
    shared_post_id: newPostData.value.share_post_id,
  }
  postService.sharePost(data)
    .then((response) => {
      postStore.posts.unshift(response.data)
      emits('toggle')
      alertStore.showAlert('Share post successfully', MessageType.SUCCESS)
    })
    .catch((error) => {
      errorHandler(error)
    })
}
watchEffect(() => {
  userStore.getUser()
  post.value.user = userStore.user
})
</script>