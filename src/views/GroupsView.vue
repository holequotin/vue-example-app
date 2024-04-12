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
const meta = ref({
  last_page: 1
})
const page = ref(1)


userStore.getUser()


function getGroups() {
  groupService.getGroupByUser(userStore.user.id, page.value, 6)
    .then((response) => {
      meta.value = response.data.meta
      groups.value = response.data.data
    })
    .catch((error) => {
      errorHandler(error)
    })
}

getGroups()
</script>

<template>
    <BaseLayout>
      <template #appbar>
        <AppBar></AppBar>
      </template>
      <template #main>
        <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px; width: 100%">
          <div style="width: 70%">
            <GroupCard v-for="group in groups" :group="group" :key="group.id"></GroupCard>
          </div>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="meta.last_page"
              :total-visible="7"
              @update:model-value="getGroups"
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