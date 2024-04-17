<script setup>
import DrawerLeftGroup from '@/components/group/DrawerLeftGroup.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import { ref } from 'vue'
import GroupFeedCard from '@/components/group/GroupFeedCard.vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'

const posts = ref([])
const meta = ref({
  last_page: 1,
  current_page: 0
})

const perPage = ref(15)

async function getGroupPosts() {
  await groupService.getGroupPosts(meta.value.current_page + 1, perPage.value)
    .then(response => {
      meta.value = response.data.meta
      posts.value.push(...response.data.data)
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function load({ done }) {
  if (meta.value.current_page < meta.value.last_page) await getGroupPosts()
  if (meta.value.current_page === meta.value.last_page) done('empty')
  else {
    done('ok')
  }
}

getGroupPosts()

</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex justify-center align-center">
        <v-infinite-scroll class="w-75" mode="manual" @load="load">
          <v-container fluid>
            <GroupFeedCard v-for="post in posts" :key="post.id" :post="post"></GroupFeedCard>
          </v-container>
        </v-infinite-scroll>
      </v-main>
    </template>
    <template #left-drawer>
      <DrawerLeftGroup></DrawerLeftGroup>
    </template>
    <template #right-drawer>
      <div></div>
    </template>
  </BaseLayout>
</template>

<style scoped>

</style>