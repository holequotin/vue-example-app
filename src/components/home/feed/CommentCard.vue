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
                <v-card-content class="content" v-if="props.comment.content">
                    <v-textarea variant="solo" v-model="commentContent" v-if="onEditing"></v-textarea>
                    <p v-else> {{ props.comment.content }}</p>
                </v-card-content>
                <slot name="image">
                    <v-file-input label="File input" hide-input class="custom-file-input" v-model="updateImage"
                        v-if="onEditing"></v-file-input>
                    <v-img width="100%" aspect-ratio="16/9" cover v-if="props.comment.imgPath"
                        :src="props.comment.imgPath"></v-img>
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
import AvatarIcon from './AvatarIcon.vue';
import { useUserStore } from '../../../stores/user';
import { commentService } from '../../../service/commentService'
import { usePostStore } from '../../../stores/post';
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
const props = defineProps(['user', 'comment']);
const commentContent = ref(props.comment.content)
const onEditing = ref(false)
const updateImage = ref(null)
const userStore = useUserStore()
const postStore = usePostStore()
function deleteComment() {
    commentService.deleteComment(props.comment.id).then((response) => {
        //show alert?
        console.log(response.data)
        postStore.deleteComment(props.comment.post_id, props.comment)
    }).catch((error) => {
        console.log(error)
    })
}
function updateComment() {
    const data = {
        content: commentContent.value,
        image: updateImage.value ? updateImage.value[0] : null
    }
    commentService.updateComment(props.comment.id, data).then((response) => {
        onEditing.value = false
        postStore.updateComment(props.comment.post_id, response.data)
    }).catch((error) => {
        console.log(error)
    })
}
</script>

<style scoped>
.title {
    font-size: 17px;
}

.content {
    font-size: 15px;
}
</style>