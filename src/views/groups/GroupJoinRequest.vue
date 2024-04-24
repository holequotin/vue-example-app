<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px;">
        <div style="width: 80%;">
          <JoinGroupCard :request="request" v-for="request in requests" :key="request.id"
                         @done="getJoinGroupRequest"></JoinGroupCard>
        </div>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="meta.last_page"
            :total-visible="7"
            @update:model-value="getJoinGroupRequest"
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
<script setup>
import { useUserStore } from '@/stores/user'
import { ref, watchEffect } from 'vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import DrawerLeft from '@/components/home/drawerLeft/DrawerLeft.vue'
import JoinGroupCard from '@/components/group/JoinGroupCard.vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'

const userStore = useUserStore()
const user = ref(userStore.user)
const page = ref(1)
const meta = ref({
  last_page: 0
})
const requests = ref([])

function getJoinGroupRequest() {
  groupService.getJoinGroupRequests(page.value, 6)
    .then((response) => {
      requests.value = response.data.data
      meta.value = response.data.meta
    })
    .catch((error) => {
      errorHandler(error)
    })
}

userStore.getUser()

user.value = userStore.user

watchEffect(() => {
  getJoinGroupRequest()
})


</script>