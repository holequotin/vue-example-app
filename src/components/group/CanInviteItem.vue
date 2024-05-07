<script setup>
import { errorHandler } from '@/utils/errorHandler'
import { groupService } from '@/service/groupService'
import { ref } from 'vue'

const props = defineProps(['user', 'groupId'])
const invited = ref(false)

async function invite() {
  const data = {
    group_id: props.groupId,
    be_invite_id: props.user.id
  }

  groupService.inviteUser(data)
    .then(response => {
      console.log('Invited')
      invited.value = true
    })
    .catch(error => errorHandler(error))
}
</script>

<template>
  <v-list-item
    :title="props.user.name"
  >
    <template #append>
      <v-btn v-if="!invited" prepend-icon="mdi-plus" variant="text" @click="invite">Invite</v-btn>
      <v-btn v-else prepend-icon="mdi-check" variant="text">Invited</v-btn>
    </template>
  </v-list-item>
</template>

<style scoped>

</style>