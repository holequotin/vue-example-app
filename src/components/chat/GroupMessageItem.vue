<script setup>

import { checkURL } from '@/utils/fileUtils'

const props = defineProps(['owner', 'message'])
</script>

<template>
  <v-row :class="{'justify-end': owner}" class="d-flex">
    <div class="d-flex mt-4">
      <v-avatar v-if="!props.owner" color="blue-darken-2" size="large">
        <v-img v-if="checkURL(props.message.user.avatar)" :src="props.message.user.avatar" alt="John"></v-img>
        <span v-else class="text-h5">{{ props.message.user.name[0] }}</span>
      </v-avatar>
      <v-card>
        <v-card-text>{{ props.message.body }}</v-card-text>
      </v-card>
    </div>
  </v-row>
</template>

<style scoped>

</style>