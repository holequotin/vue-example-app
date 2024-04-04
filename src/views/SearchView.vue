<script setup>

import DrawerLeft from '@/components/home/drawerLeft/DrawerLeft.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import DrawerRight from '@/components/home/drawerRight/DrawerRight.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'
import { checkURL } from '@/utils/fileUtils'

const route = useRoute()
const userStore = useUserStore()
const searchStore = useSearchStore()


userStore.getUser()

async function load({ done }) {
  await searchStore.searchUsers(route.query.search)
  done('empty')
}
</script>

<template>
  <v-infinite-scroll :onLoad="load">
    <BaseLayout>
      <template #appbar>
        <AppBar></AppBar>
      </template>
      <template #main>
        <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px; width: 100%">
          <h1>{{searchStore.users.length}}</h1>
          <div style="width: 70%">
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

<style scoped>

</style>