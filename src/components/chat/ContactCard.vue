<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { checkURL } from '@/utils/fileUtils'

const userStore = useUserStore()
const router = useRouter()

const props = defineProps(['message'])
const user = computed(() => {
  if (props.message.from_user.id === userStore.user.id) {
    return props.message.to_user
  }
  return props.message.from_user
})

function toChat() {
  router.push({ name: 'chat', params: { id: user.value.id } })
}
</script>

<template>
  <v-card @click="toChat">
    <template #prepend>
      <div class="d-flex justify-start">
        <v-avatar v-if="!props.owner" color="blue-darken-2" size="large">
          <v-img v-if="checkURL(user.avatar)" :src="user.avatar" alt="John"></v-img>
          <span v-else class="text-h5">{{ user.name[0] }}</span>
        </v-avatar>
        <div class="ml-3">
          <div class="d-flex align-items-center">
            <v-card-title class="d-inline">{{ user.name }}</v-card-title>
          </div>
          <v-card-subtitle>
            {{ props.message.body }}
          </v-card-subtitle>
        </div>
      </div>
    </template>
  </v-card>
</template>

<style scoped>

</style>