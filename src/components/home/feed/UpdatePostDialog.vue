<template>
    <BaseDialog :dialog="props.dialog" @toggle="close" :width="600">
        <template #title>
            <span>
                Update Post
            </span>
        </template>
        <template #content>
            <PostCard type="dialog" :post="newPostData" width="100%" class="overflow-auto">
                <template #text>
                    <v-textarea label="" variant="solo" auto-grow placeholder="What's your mind?"
                        v-model="newPostData.body"></v-textarea>
                </template>
                <template #image>
                    <v-container grid-list-xs>
                        <v-file-input label="File input" hide-input class="custom-file-input"
                            v-model="newPostData.images" multiple></v-file-input>
                    </v-container>
                    <h3>Delete image</h3>
                    <v-checkbox v-for="image in post.images" :label="image.id" v-model="newPostData.delete_image_id"
                        :value="image.id" v-bind:key="image.id"></v-checkbox>
                    <v-select :items="postType" density="compact" label="Type" v-model="newPostData.type"></v-select>
                </template>
                <template #actions>
                    <v-container grid-list-xs>
                        <v-btn outline color="primary" dark block :disabled="isDiabled" @click="update">Update</v-btn>
                    </v-container>
                </template>
            </PostCard>
        </template>
    </BaseDialog>
</template>
<script setup>
import BaseDialog from './BaseDialog.vue'
import PostCard from './PostCard.vue'
import { computed, ref } from 'vue'
import { postService } from '@/service/postService'
import { errorHandler } from '@/utils/errorHandler'
import { usePostStore } from '@/stores/post'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'

const postStore = usePostStore()
const props = defineProps(['dialog', 'post'])
const emit = defineEmits(['toggle', 'edited'])
const alertStore = useAlertStore()

const postType = [
    { title: 'Public', value: "public" },
    { title: 'Friends', value: "friends" },
    { title: 'Private', value: "private" },
]
const newPostData = ref({
    ...props.post,
    images: null,
    delete_image_id: []
})

const isDiabled = computed(() => {
    if (newPostData.value.body || newPostData.value.images) return false;
    return true
})

function update() {
    postService.updatePost(props.post.id, newPostData.value)
        .then((response) => {
          console.log(response.data)
          emit('edited')
          postStore.updatePost(response.data.post)
          alertStore.showAlert('Update post successfully', MessageType.SUCCESS)
        })
        .catch((error) => {
            errorHandler(error)
        })
    close()
}

function close() {
    newPostData.value = {
        ...props.post,
        images: null,
        delete_image_id: []
    }
    emit('toggle')
}
</script>