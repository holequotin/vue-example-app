<script setup>
import { checkURL } from '@/utils/fileUtils'

const props = defineProps(['user'])
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      v-if="checkURL(props.user.avatar)"
      :src="user.avatar"
      cover
      height="200px"
    ></v-img>
    <v-avatar
      v-else
      color="surface-variant"
      rounded="0"
      style="width: 100%; height: 200px"
    >
      <span>{{ props.user.name[0] }}</span>
    </v-avatar>

    <RouterLink :to="{ name: 'profile-parent', params: { id: props.user.id } }" style="color: white;">
      <v-card-title>{{ props.user.name }}</v-card-title>
    </RouterLink>

    <v-card-subtitle>
      {{ props.user.mutual_friend }} mutual friend
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        text="Add friend"
      ></v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>