<script setup>
import { checkURL } from '@/utils/fileUtils'

const props = defineProps(['group'])
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
      </div>
    </template>
  </v-card>
</template>

<style scoped>

</style>