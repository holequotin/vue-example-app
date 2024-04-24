<template>
  <BaseProfile>
    <template #content>
      <GroupsList :groups="groups" @created="getGroups"></GroupsList>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="meta.last_page"
          :total-visible="7"
          @update:model-value="getGroups"
        ></v-pagination>
      </div>
    </template>
  </BaseProfile>
</template>

<script setup>
import BaseProfile from './BaseProfile.vue'
import GroupsList from '@/views/profile/GroupsList.vue'
import { ref, watchEffect } from 'vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import { useRoute } from 'vue-router'

const route = useRoute()
const groups = ref([])
const meta = ref({
  last_page: 1
})

const page = ref(1)

function getGroups() {
  groupService.getGroupByUser(route.params.id, page.value, 12)
    .then((response) => {
      meta.value = response.data.meta
      groups.value = response.data.data
    })
    .catch((error) => {
      errorHandler(error)
    })
}

watchEffect(() => {
  getGroups()
})
</script>