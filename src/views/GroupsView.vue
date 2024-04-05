<script setup>

import DrawerLeft from '@/components/home/drawerLeft/DrawerLeft.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import DrawerRight from '@/components/home/drawerRight/DrawerRight.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import { useUserStore } from '@/stores/user'
import GroupCard from '@/components/group/GroupCard.vue'
import { ref } from 'vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'

const userStore = useUserStore()
const groups = ref([])
const currentPage = ref(0)
const meta = ref(null)


userStore.getUser()

async function load({ done }) {
  await getGroups()
  done('empty')
}

function getGroups() {
  if ((currentPage.value === 0 || meta.value?.last_page) && userStore.user) {
    groupService.getGroupByUser(userStore.user.id, currentPage.value + 1, 20)
      .then((response) => {
        currentPage.value = response.data.meta.current_page
        meta.value = response.data.meta
        groups.value.push(...response.data.data)
      })
      .catch((error) => {
        errorHandler(error)
      })
  }
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
          <div style="width: 70%">
            <GroupCard v-for="group in groups" :group="group" :key="group.id"></GroupCard>
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