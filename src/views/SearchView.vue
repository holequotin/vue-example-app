<script setup>

import DrawerLeft from '@/components/home/drawerLeft/DrawerLeft.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'
import { checkURL } from '@/utils/fileUtils'
import GroupCard from '@/components/group/GroupCard.vue'
import { ref } from 'vue'

const route = useRoute()
const userStore = useUserStore()
const searchStore = useSearchStore()
const page = ref(1)

userStore.getUser()
getData()

async function getData() {
  if (searchStore.type === 'users') {
    await searchStore.searchUsers(route.query.search, page.value, 6)
  }
  if (searchStore.type === 'groups') {
    await searchStore.searchGroups(route.query.search, page.value, 6)
  }
}

async function change() {
  await searchStore.reset()
  page.value = 0
  getData()
}

const items = [
  { title: 'User', value: 'users' },
  { title: 'Groups', value: 'groups' }
]

</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px; width: 100%">
        <v-container class="w-25">
          <v-select
            label="Select"
            :items="items"
            variant="outlined"
            v-model="searchStore.type"
            @update:modelValue="change"
          ></v-select>
        </v-container>
        <div v-if="searchStore.type === 'users'" style="width: 70%">
          <v-card v-for="user in searchStore.users" :key="user.id" class="mb-5" width="100%">
            <template v-slot:prepend>
              <div class="d-flex justify-start">
                <v-avatar color="blue-darken-2" size="large">
                  <v-img v-if="checkURL(user.avatar)" :src="user.avatar" alt="John"></v-img>
                  <span v-else class="text-h5">{{ user.name[0].toUpperCase() }}</span>
                </v-avatar>
                <div class="ml-3">
                  <RouterLink :to="{ name: 'profile-parent', params: { id: user.id } }" style="color: white;">
                    <v-card-title>{{ user.name }}</v-card-title>
                  </RouterLink>
                </div>
              </div>
            </template>
          </v-card>
          <h1 v-if="searchStore.users.length === 0" class="text-center">No user matched</h1>
        </div>
        <div v-if="searchStore.type === 'groups'" style="width: 70%">
          <GroupCard v-for="group in searchStore.groups" :key="group" :group="group"></GroupCard>
          <h1 v-if="searchStore.groups.length === 0" class="text-center">No group matched</h1>
        </div>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="searchStore.meta.last_page"
            :total-visible="7"
            @update:model-value="getData"
          ></v-pagination>
        </div>
      </v-main>
    </template>
    <template #left-drawer>
      <DrawerLeft></DrawerLeft>
    </template>
    <template #right-drawer>
      <div></div>
    </template>
  </BaseLayout>
</template>

<style scoped>

</style>