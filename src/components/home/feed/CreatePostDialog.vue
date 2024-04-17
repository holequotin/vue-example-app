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
                  <v-select v-model="newPostData.type" :disabled="props.group" :items="postType" density="compact"
                            label="Type"></v-select>
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
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'

const props = defineProps(['dialog', 'group'])
const userStore = useUserStore()
const emit = defineEmits(['toggle', 'created'])
const alertStore = useAlertStore()


const defaultType = computed(() => {
  if (props.group) {
    if (props.group.type === '1') return 'public'
    return 'private'
  }
  return 'public'
})

const postType = [
    { title: 'Public', value: "public" },
    { title: 'Friends', value: "friends" },
    { title: 'Private', value: "private" },
]
const newPostData = ref({
    body: null,
    images: null,
  type: defaultType.value
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
      alertStore.showAlert(response.data.message, MessageType.SUCCESS)
        emit('toggle')
      emit('created')
    }).catch((error) => {
        console.log(error)
        errorHandler(error)
    })
}

watchEffect(() => {
    post.value.user = userStore.user
})
</script>