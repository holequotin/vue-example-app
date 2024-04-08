<script setup>

import DrawerLeft from '@/components/home/drawerLeft/DrawerLeft.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import DrawerRight from '@/components/home/drawerRight/DrawerRight.vue'
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
          <v-select
            label="Select"
            :items="items"
            variant="outlined"
            v-model="searchStore.type"
            @update:modelValue="change"
          ></v-select>
          <div style="width: 70%" v-if="searchStore.type === 'users'">
            <v-card width="100%" class="mb-5" v-for="user in searchStore.users" :key="user.id">
              <template v-slot:prepend>
                <div class="d-flex justify-start">
                  <v-avatar color="blue-darken-2" size="large">
                    <v-img v-if="checkURL(user.avatar)" alt="John" :src="user.avatar"></v-img>
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
          </div>
          <div style="width: 70%" v-if="searchStore.type === 'groups'">
            <GroupCard v-for="group in searchStore.groups" :key="group" :group="group"></GroupCard>
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
        <DrawerRight></DrawerRight>
      </template>
    </BaseLayout>
</template>

<style scoped>

</style>