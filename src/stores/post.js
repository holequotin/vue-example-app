import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postService } from '../service/postService'
import { useUserStore } from './user'

export const usePostStore = defineStore('posts', () => {
  const posts = ref([])
  const userStore = useUserStore()
  async function getAllPost() {
    postService
      .getAllPost()
      .then((response) => {
        console.log(response.data)
        posts.value = response.data
      })
      .catch((err) => {
        console.log(err.data.message)
      })
  }
  function storeReaction(postId, reaction) {
    let post = posts.value.find((item) => {
      return item.id === postId
    })
    post.reactions.push(reaction)
    posts.value = posts.value.map((item) => {
      if (item.id === postId) {
        return post
      }
      return item
    })
  }
  function updateReaction(postId, reaction) {
    let post = posts.value.find((item) => {
      return item.id === postId
    })
    post.reactions = post.reactions.map((item) => {
      if (item.id === reaction.id) {
        return reaction
      }
      return item
    })
    posts.value = posts.value.map((item) => {
      if (item.id === postId) {
        return post
      }
      return item
    })
  }
  function deleteReaction(postId) {
    let post = posts.value.find((item) => {
      return item.id === postId
    })
    post.reactions = post.reactions.filter((item) => {
      return item.user.id !== userStore.user.id
    })
    posts.value = posts.value.map((item) => {
      if (item.id === postId) {
        return post
      }
      return item
    })
  }
  function storeComment(postId,comment) {
    let post = posts.value.find((item) => {
      return item.id === postId
    })
    post.comments.push(comment)
    posts.value = posts.value.map((item) => {
      if (item.id === postId) {
        return post
      }
      return item
    })
  }
  return { posts, getAllPost, storeReaction, deleteReaction, updateReaction, storeComment }
})
