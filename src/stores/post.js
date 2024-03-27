import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postService } from '../service/postService'
import { useUserStore } from './user'
import {useRoute} from 'vue-router'
import { computed } from 'vue'
import { errorHandler } from '../utils/errorHandler'

export const usePostStore = defineStore('posts', () => {
  const route = useRoute()
  const posts = ref([])
  const currentPage = ref(1)
  const userStore = useUserStore()

  const profilePosts = computed(() => {
    return posts.value.filter((item) => {
      return item.user.id == route.params.id
    })
  })

  function nextPage(...params) {
    currentPage.value++;
    params[0](params[1])
  }

  function previousPage(...params) {
    if(currentPage.value > 1) {
          currentPage.value--;
          params[0](params[1])
    }
  }

  async function getAllPost() {
    //FIXME: Magic number
    postService
      .getAllPost(currentPage.value, 5)
      .then((response) => {
        console.log(response.data)
        posts.value = response.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function getPostsByUser(userId){
    console.log('userId', userId);
    postService.getPostsByUser(userId, currentPage.value, 5)
    .then((response) => {
        posts.value = response.data
        console.log(posts.value)
    })
    .catch((error) => {
        errorHandler(error)
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
  function storeComment(postId, comment) {
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
  function updateComment(postId, comment) {
    let post = posts.value.find((item) => {
      return item.id === postId
    })
    post.comments = post.comments.map((item) => {
      if (item.id == comment.id) {
        return comment
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
  function deleteComment(postId, comment) {
    console.log('delete comment')
    let post = posts.value.find((item) => {
      return item.id == postId
    })
    post.comments = post.comments.filter((item) => {
      return item.id !== comment.id
    })
    posts.value = posts.value.map((item) => {
      if (item.id === postId) {
        return post
      }
      return item
    })
  }
  function storePost(data) {
    posts.value.unshift(data)
  }
  return {
    posts,
    currentPage,
    profilePosts,
    getAllPost,
    storePost,
    storeReaction,
    deleteReaction,
    updateReaction,
    storeComment,
    deleteComment,
    updateComment,
    nextPage,
    previousPage,
    getPostsByUser
  }
})
