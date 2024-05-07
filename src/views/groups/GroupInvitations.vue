<script setup>

import AppBar from '@/components/home/appbar/AppBar.vue'
import DrawerLeftGroup from '@/components/group/DrawerLeftGroup.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import { ref } from 'vue'
import GroupInvitationCard from '@/components/group/GroupInvitationCard.vue'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'

const meta = ref({
  last_page: 1,
  current_page: 0
})

const currentPage = ref(1)
const perPage = ref(15)
const invitations = ref([])

function getInvitations() {
  userService.getGroupInvitations(currentPage.value, perPage.value)
    .then(response => {
      invitations.value = response.data.data
      meta.value = response.data.meta
    }).catch(error => {
    errorHandler(error)
  })
}

getInvitations()
</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex align-center justify-center flex-column">
        <GroupInvitationCard v-for="invitation in invitations" :key="invitation" :invitation="invitation"
                             @replied="getInvitations">
        </GroupInvitationCard>
        <div class="text-center">
          <v-pagination
            v-model="currentPage"
            :length="meta.last_page"
            :total-visible="7"
            @update:model-value="getInvitations"
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