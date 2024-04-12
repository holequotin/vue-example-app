<template>
  <BaseDialog :dialog="props.dialog" @toggle="close" :width="600">
    <template #title>
            <span>
                Comments
            </span>
    </template>
    <template #content>
      <v-list lines="two">
        <v-infinite-scroll :onLoad="load">
          <v-list-item v-for="comment in comments" :key="comment">
            <CommentCard :comment="comment" :user="comment.user" @deleted="() => deleteComment(comment)" @updated="updateComment"></CommentCard>
          </v-list-item>
        </v-infinite-scroll>
      </v-list>
      <v-divider></v-divider>
      <NewComment :post="post" :user="userStore.user" @created="addComment"></NewComment>
    </template>
  </BaseDialog>
</template>
<script setup>
import BaseDialog from './BaseDialog.vue'
import NewComment from './NewComment.vue'
import { ref } from 'vue'
import { commentService } from '@/service/commentService'
import { errorHandler } from '@/utils/errorHandler'
import { useUserStore } from '@/stores/user'
import CommentCard from '@/components/home/feed/CommentCard.vue'

const props = defineProps(['dialog', 'post'])
const emit = defineEmits(['toggle'])
const userStore = useUserStore()

const comments = ref([])
const currentPage = ref(0)
const meta = ref(null)

function close() {
  emit('toggle')
  comments.value = []
  currentPage.value = 0
  meta.value = null
}

async function getComments() {
  if (currentPage.value < meta.value?.last_page || currentPage.value === 0) {
    commentService.getCommentByPost(props.post.id, currentPage.value + 1, 5)
      .then((response) => {
        meta.value = response.data.meta
        currentPage.value = meta.value.current_page
        comments.value.push(...response.data.data)
      })
      .catch((error) => {
        errorHandler(error)
      })
  }
}

async function load({ done }) {
  await getComments()
  done('empty')
}

function addComment(comment) {
  comments.value.unshift(comment)
}

function updateComment(comment) {
  comments.value = comments.value.map((item) => {
    if(comment.id == item.id) return comment
    return item
  })
}
function deleteComment(comment) {
  comments.value = comments.value.filter((item) => {
    return item.id != comment.id
  })
}
</script>