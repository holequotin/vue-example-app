<template>
    <div class="d-flex justify-start align-center">
        <AvatarIcon :user="props.user" :size="40" class="mb-2"></AvatarIcon>
        <v-card variant="tonal" class="rounded-xl">
            <v-card-item>
                <v-card-title class="title">
                    {{ user.name }}
                </v-card-title>
                <v-card-content class="content" v-if="props.comment.content">
                    {{ props.comment.content }}
                </v-card-content>
                <slot name="image">
                    <v-img width="100%" aspect-ratio="16/9" cover v-if="props.comment.imgPath"
                        :src="props.comment.imgPath"></v-img>
                </slot>
            </v-card-item>
        </v-card>
        <v-menu location="end" v-if="userStore.user.id === props.comment.user.id">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="plain" icon="mdi-dots-horizontal" size="small">
                    
                </v-btn>
            </template>
            <v-list>
                <v-list-item prepend-icon="mdi-pencil" @click="console.log('Update Comment')">
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
import {commentService} from '../../../service/commentService'
import {usePostStore} from '../../../stores/post'
const props = defineProps(['user', 'comment']);
const userStore = useUserStore()
const postStore = usePostStore()
function deleteComment() {
    commentService.deleteComment(props.comment.id).then((response) => {
        //show alert?
        console.log(response.data)
        postStore.deleteComment(props.comment.post_id,props.comment)
    }).catch((error) => {
        console.log(error)
    } )
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