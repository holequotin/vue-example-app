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
                    <v-textarea label="" variant="solo" auto-grow placeholder="What's your mind?" v-model="newPostData.content"></v-textarea>
                </template>
                <template #image>
                    <v-container grid-list-xs>
                        <v-file-input label="File input" hide-input class="custom-file-input" v-model="newPostData.image"></v-file-input>
                    </v-container>
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
import BaseDialog from './BaseDialog.vue';
import PostCard from './PostCard.vue';
import { computed, ref, watchEffect } from 'vue'
import { useUserStore } from '../../../stores/user';
import {postService} from '../../../service/postService'
import {usePostStore} from '../../../stores/post'
const props = defineProps(['dialog'])
const userStore = useUserStore()
const postStore = usePostStore()
const emit = defineEmits(['toggle'])
const newPostData = ref({
    content : null,
    image : null
})
const isDiabled = computed(() => {
    if(newPostData.value.content || newPostData.value.image) return false;
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
    const data = {
        content : newPostData.value.content ? newPostData.value.content : null,
        image : newPostData.value.image ? newPostData.value.image[0] : null
    }
    postService.storePost(data).then((response) => {
        emit('toggle')
        postStore.storePost(response.data);
    }).catch((error) => {
        console.log(error)
    })
}
watchEffect(() => {
    post.value.user = userStore.user
})
</script>