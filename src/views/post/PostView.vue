<script setup>
import BaseLayout from '@/views/base/BaseLayout.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { postService } from '@/service/postService'
import { errorHandler } from '@/utils/errorHandler'
import PostCard from '@/components/home/feed/PostCard.vue'

const route = useRoute()
const currPostId = ref(route.params.id)
const post = ref(null)

watchEffect(() => {
  currPostId.value = route.params.id
  postService.getPostById(currPostId.value)
    .then(response => {
      console.log(response)
      post.value = response.data.post
    })
    .catch((error) => {
      errorHandler(error)
    })
})
</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px;">
        <div style="width: 70%;">
          <PostCard v-if="post" :post="post" type="feed"></PostCard>
        </div>
      </v-main>
    </template>
    <template #left-drawer>
      <div></div>
    </template>
    <template #right-drawer>
      <div></div>
    </template>
  </BaseLayout>
</template>

<style scoped>

</style>