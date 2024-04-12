<script setup>
import { checkURL } from '@/utils/fileUtils'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()
const props = defineProps(['group'])
const inMyPage = computed(() => {
  return route.params.id == userStore.user.id
})

const inGroupsView = computed(() => {
  return route.name == 'groups'
})

const groupType = computed(() => {
  if (props.group?.type === '1') return 'Public'
  return 'Private'
})

const isOwner = computed(() => props.group.owner?.id == userStore.user.id)
</script>

<template>
  <v-card width="100%" class="mb-5">
    <template v-slot:prepend>
      <div class="d-flex justify-start">
        <v-avatar color="blue-darken-2" size="large" rounded="0">
          <v-img v-if="checkURL(props.group.url)" alt="John" :src="props.group.url"></v-img>
          <span v-else class="text-h5">{{ props.group.name[0].toUpperCase() }}</span>
        </v-avatar>
        <div class="ml-3">
          <RouterLink :to="{name: 'group-view', params: {id : props.group.id}}">
            <v-card-title>{{ props.group.name }}</v-card-title>
          </RouterLink>
        </div>
        <v-chip class="ml-2">
          {{ groupType }}
        </v-chip>
      </div>
    </template>
    <template v-slot:append>
      <v-menu v-if="(inMyPage || inGroupsView) && isOwner">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item @click="console.log('Edit group')">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="console.log('Delete group')">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-card>
</template>
<style scoped>

</style>