import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postService } from '../service/postService'

export const usePostStore = defineStore('posts', () => {
  const posts = ref([])
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
  return {posts,getAllPost}
})