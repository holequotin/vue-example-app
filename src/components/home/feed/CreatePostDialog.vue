<template>
    <BaseDialog :dialog="props.dialog" @toggle="$emit('toggle')" :width="600">
        <template #title>
            <span>
                Create Post
            </span>
        </template>
        <template #content>
            <PostCard type="dialog" :post="post" width="100%" class="overflow-auto">
                <template #text>
                    <v-textarea label="" variant="solo" auto-grow placeholder="What's your mind?"
                        v-model="newPostData.body"></v-textarea>
                </template>
                <template #image>
                    <v-container grid-list-xs>
                        <v-file-input label="File input" hide-input class="custom-file-input"
                            v-model="newPostData.images" multiple></v-file-input>
                    </v-container>
                    <v-select :items="postType" density="compact" label="Type" v-model="newPostData.type"></v-select>
                </template>
                <template #actions>
                    <v-container grid-list-xs>
                        <v-btn outline color="primary" dark block :disabled="isDiabled" @click="storePost">Post</v-btn>
                    </v-container>
                </template>
            </PostCard>
        </template>
    </BaseDialog>
</template>
<script setup>
import BaseDialog from './BaseDialog.vue'
import PostCard from './PostCard.vue'
import { computed, ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { postService } from '@/service/postService'
import { usePostStore } from '@/stores/post'
import { errorHandler } from '@/utils/errorHandler'

const props = defineProps(['dialog', 'group'])
const userStore = useUserStore()
const postStore = usePostStore()
const emit = defineEmits(['toggle'])

const postType = [
    { title: 'Public', value: "public" },
    { title: 'Friends', value: "friends" },
    { title: 'Private', value: "private" },
]
const newPostData = ref({
    body: null,
    images: null,
    type: "public"
})
const isDiabled = computed(() => {
    if (newPostData.value.body || newPostData.value.images) return false;
    return true
})
const post = ref({
    id: -1,
    content: null,
    imgPath: null,
    user: {},
    reactions: [],
    comments: []
})
function storePost() {
  let data = {
        body: newPostData.value.body ? newPostData.value.body : null,
        images: newPostData.value.images ? newPostData.value.images : null,
        type: newPostData.value.type
    }
  if (props.group) {
    data = { ...data, group_id: props.group.id }
  }

    // alert(JSON.stringify(data))
    postService.storePost(data).then((response) => {
        console.log(response.data)
        emit('toggle')
      postStore.posts.unshift(response.data.post)
    }).catch((error) => {
        console.log(error)
        errorHandler(error)
    })
}
watchEffect(() => {
    post.value.user = userStore.user
})
</script>