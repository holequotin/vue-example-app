<template>
  <v-infinite-scroll style="height: 100vh" :onLoad="load">
    <BaseLayout>
      <template #appbar>
        <AppBar></AppBar>
      </template>
      <template #main>
        <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px;">
          <div style="width: 90%;">
            <NewPostCard @created="created"></NewPostCard>
          </div>
          <div style="width: 90%;">
            <PostCard v-for="post in postStore.posts" :key="post" :post="post" type="feed"
                      @deleted="() => postStore.deletePost(post.id)"></PostCard>
          </div>
        </v-main>
      </template>
      <template #left-drawer>
        <DrawerLeft></DrawerLeft>
      </template>
      <template #right-drawer>
        <DrawerRight></DrawerRight>
      </template>
    </BaseLayout>
  </v-infinite-scroll>
</template>
<script setup>
import BaseLayout from './base/BaseLayout.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import NewPostCard from '../components/home/feed/NewPostCard.vue'
import PostCard from '../components/home/feed/PostCard.vue'
import DrawerLeft from '../components/home/drawerLeft/DrawerLeft.vue'
import DrawerRight from '../components/home/drawerRight/DrawerRight.vue'
import { usePostStore } from '@/stores/post'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'


const postStore = usePostStore()
const userStore = useUserStore()
const posts = ref(postStore.posts)
const user = ref(userStore.user)

userStore.getUser()

posts.value = postStore.posts
user.value = userStore.user

postStore.$reset()

async function load({ done }) {
  // Perform API call
  await postStore.getPosts()

  done('empty')
}

function created() {
  postStore.$reset()
  postStore.getPosts()
}

</script>
