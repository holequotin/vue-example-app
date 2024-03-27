<template>
    <BaseDialog :dialog="props.dialog" @toggle="close" :width="600">
        <template #title>
            <span>
                Comments
            </span>
        </template>
        <template #content>
            <CommentList :comments="comments" @deleted="() => getComments()"></CommentList>
            <v-container grid-list-xs style="width: 80%;">
                <v-row class="d-flex justify-space-between">
                    <v-btn outline color="primary" dark
                        @click="previousPage">Previous</v-btn>
                    <span>Current page: {{ currentPage }}</span>
                    <v-btn outline color="primary" dark @click="nextPage">Next</v-btn>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <NewComment :post="post" :user="userStore.user" @created="() => {currentPage = 1; getComments()}"></NewComment>
        </template>
    </BaseDialog>
</template>
<script setup>
import BaseDialog from './BaseDialog.vue';
import CommentList from './CommentList.vue';
import NewComment from './NewComment.vue';
import { ref, watchEffect } from 'vue'
import { commentService } from '../../../service/commentService'
import { errorHandler } from '../../../utils/errorHandler';
import { useUserStore } from '../../../stores/user';
const props = defineProps(['dialog', 'post'])
const emit = defineEmits(['toggle'])
const userStore = useUserStore()

const comments = ref([])
const currentPage = ref(1)

function close() {
    emit('toggle')
}

watchEffect(() => {
    getComments()
})

function getComments() {
    commentService.getCommentByPost(props.post.id, currentPage.value, 4)
        .then((response) => {
            comments.value = response.data
        })
        .catch((error) => {
            console.log(error)
            errorHandler(error)
        })
}

function nextPage() {
    currentPage.value++
    getComments()
}

function previousPage() {
    if(currentPage.value > 1) {
        currentPage.value--
        getComments()
    }
}
</script>