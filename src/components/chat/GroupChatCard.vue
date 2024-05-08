<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['groupChat'])
const router = useRouter()
const toGroupChat = () => {
  router.push({ name: 'chat-group', params: { id: 10 } })
}
</script>

<template>
  <v-card @click="toGroupChat">
    <template #prepend>
      <div class="d-flex justify-start">
        <v-avatar color="blue-darken-2" size="large">
          <span class="text-h5">{{ groupChat.name[0] }}</span>
        </v-avatar>
        <div class="ml-3">
          <div class="d-flex align-items-center">
            <v-card-title class="d-inline">{{ groupChat.name }}</v-card-title>
          </div>
        </div>
      </div>
    </template>
  </v-card>
</template>

<style scoped>

</style>