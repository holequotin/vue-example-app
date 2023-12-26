<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px;">
        <NewPostCard></NewPostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
      </v-main>
    </template>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from './base/BaseLayout.vue';
import AppBar from '../components/home/appbar/AppBar.vue'
import NewPostCard from '../components/home/feed/NewPostCard.vue';
import PostCard from '../components/home/feed/PostCard.vue';
</script>
