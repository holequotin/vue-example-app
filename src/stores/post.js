import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postService } from '@/service/postService'

export const usePostStore = defineStore('posts', () => {
  const posts = ref([])
  const currentPage = ref(0)
  const meta = ref(null)

  function $reset() {
    posts.value = []
    currentPage.value = 0
    meta.value = null
  }

  async function getPosts() {
    if (currentPage.value === 0 || meta.value?.last_page) {
      postService.getAllPost(currentPage.value + 1, 15)
        .then((response) => {
          currentPage.value = response.data.meta.current_page
          meta.value = response.data.meta
          posts.value.push(...response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  async function getPostsByUser(userId){
    if (currentPage.value === 0 || meta.value?.last_page) {
      postService.getPostsByUser(userId, currentPage.value + 1, 5)
        .then((response) => {
          currentPage.value = response.data.meta.current_page
          meta.value = response.data.meta
          posts.value.push(...response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  function deletePost(postId) {
    posts.value = posts.value.filter((post) => {
      return post.id != postId
    })
  }

  function updatePost(updatedPost) {
    posts.value = posts.value.map((post) => {
      if (post.id !== updatedPost.id) return post
      return updatedPost
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
      if (item.id === comment.id) {
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
      return item.id === postId
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
    $reset,
    getPosts,
    storePost,
    storeReaction,
    updateReaction,
    storeComment,
    deleteComment,
    updateComment,
    getPostsByUser,
    deletePost,
    updatePost
  }
})
