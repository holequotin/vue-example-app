<template>
    <div class="d-flex justify-start align-center">
        <AvatarIcon :user="props.user" :size="40" class="mb-2"></AvatarIcon>
        <v-card variant="tonal" class="rounded-xl">
            <v-card-item>
                <RouterLink :to="{ name: 'profile-parent', params: { id: props.user.id } }">
                    <v-card-title class="title" style="color: white;">
                        {{ user.name }}
                    </v-card-title>
                </RouterLink>
                <v-card-item class="content" v-if="props.comment.body">
                    <v-textarea variant="solo" v-model="commentContent" v-if="onEditing"></v-textarea>
                  <p v-else class="pa-0"> {{ props.comment.body }}</p>
                </v-card-item>
                <slot name="image">
                    <v-file-input label="File input" hide-input class="custom-file-input" v-model="updateImage"
                        v-if="onEditing"></v-file-input>
                    <v-img width="100%" aspect-ratio="16/9" cover v-if="props.comment.url"
                        :src="props.comment.url"></v-img>
                    <v-checkbox label="Delete image" v-if="onEditing" v-model="deleteImage"></v-checkbox>
                </slot>
            </v-card-item>
            <v-card-actions v-if="onEditing" class="d-flex justify-space-around" width="auto">
                <v-btn color="error" @click="onEditing = false">Cancel</v-btn>
                <v-btn color="success" @click="updateComment">Update</v-btn>
            </v-card-actions>
        </v-card>
        <v-menu location="end" v-if="userStore.user.id === props.comment.user.id && !onEditing">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="plain" icon="mdi-dots-horizontal" size="small">

                </v-btn>
            </template>
            <v-list>
                <v-list-item prepend-icon="mdi-pencil" @click="onEditing = true">
                    <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-delete" @click="deleteComment">
                    <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script setup>
import AvatarIcon from './AvatarIcon.vue'
import { useUserStore } from '@/stores/user'
import { commentService } from '@/service/commentService'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { errorHandler } from '@/utils/errorHandler'

const props = defineProps(['user', 'comment']);
const emit = defineEmits(['deleted', 'updated'])
const commentContent = ref(props.comment.body)
const onEditing = ref(false)
const updateImage = ref(null)
const userStore = useUserStore()
const deleteImage = ref(false)
function deleteComment() {
    commentService.deleteComment(props.comment.id).then((response) => {
        console.log(response)
        emit('deleted')
    }).catch((error) => {
        errorHandler(error)
    })
}
function updateComment() {
    const data = {
        body: commentContent.value,
      image: updateImage.value,
        delete_image: deleteImage.value ? 1 : 0
    }
    commentService.updateComment(props.comment.id, data).then((response) => {
        console.log(response.data)
        onEditing.value = false
        emit('updated', response.data.comment)
    }).catch((error) => {
        errorHandler(error)
    })
}
</script>

<style scoped>
.title {
    font-size: 17px;
}

.content {
    font-size: 15px;
    text-align: left;
}
</style>