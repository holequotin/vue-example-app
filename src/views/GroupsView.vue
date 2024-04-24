<script setup>
import AppBar from '@/components/home/appbar/AppBar.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import { useUserStore } from '@/stores/user'
import GroupCard from '@/components/group/GroupCard.vue'
import { ref } from 'vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import DrawerLeftGroup from '@/components/group/DrawerLeftGroup.vue'

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
        <v-main class="d-flex align-center flex-column" style="min-height: 300px; width: 100%">
          <h1>Groups you've joined</h1>
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
        <DrawerLeftGroup></DrawerLeftGroup>
      </template>
      <template #right-drawer>
        <div></div>
      </template>
    </BaseLayout>
</template>

<style scoped>

</style>