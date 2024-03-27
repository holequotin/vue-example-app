<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px;">
        <div style="width: 70%;">
          <NewPostCard></NewPostCard>
        </div>
        <div style="width: 70%;">
          <PostCard v-for="post in postStore.posts" :key="post.id" :post="post" type="feed"
            @delete="postStore.getAllPost" @update="postStore.getAllPost"></PostCard>
        </div>
        <v-container grid-list-xs style="width: 70%;">
          <v-row class="d-flex justify-space-between">
            <v-btn outline color="primary" dark @click="postStore.previousPage(postStore.getAllPost)">Previous</v-btn>
            <span>Current page: {{ postStore.currentPage }}</span>
            <v-btn outline color="primary" dark @click="postStore.nextPage(postStore.getAllPost)">Next</v-btn>
          </v-row>
        </v-container>
      </v-main>
    </template>
    <template #left-drawer>
      <DrawerLeft></DrawerLeft>
    </template>
    <template #right-drawer>
      <DrawerRight></DrawerRight>
    </template>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from './base/BaseLayout.vue';
import AppBar from '../components/home/appbar/AppBar.vue'
import NewPostCard from '../components/home/feed/NewPostCard.vue';
import PostCard from '../components/home/feed/PostCard.vue';
import DrawerLeft from '../components/home/drawerLeft/DrawerLeft.vue';
import DrawerRight from '../components/home/drawerRight/DrawerRight.vue';
import { usePostStore } from '../stores/post';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';


const postStore = usePostStore()
const userStore = useUserStore()
const posts = ref(postStore.posts);
const user = ref(userStore.user);
console.log('in home')

postStore.getAllPost()
userStore.getUser()

posts.value = postStore.posts
user.value = userStore.user
</script>
