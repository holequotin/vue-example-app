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
    let user = userStore.user
    let isExisited = false
    post.reactions = post.reactions.map((item) => {
      if (user.id === item.user.id) {
        //send request to update here
        isExisited = true
        console.log('updated', { ...item, type: reaction.id })
        return { ...item, type: reaction.id }
      }
      return item
    })
    if (!isExisited) {
      // send request and get reaction here
      post.reactions.push({
        id: -1,
        post_id: post.id,
        user: userStore.user,
        type: reaction.id
      })
    }
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
      if(item.id === postId) {
        return post;
      }
      return item;
    })
  }
  return { posts, getAllPost, storeReaction,deleteReaction }
})
