<script setup>

import { checkURL } from '@/utils/fileUtils'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'

const props = defineProps(['request'])
const emits = defineEmits(['done'])
const alertStore = useAlertStore()

console.log(JSON.stringify(props.request))

function accept() {
  groupService.accept(props.request.group.id, props.request.user.id)
    .then(response => {
      alertStore.showAlert(response.data.message, MessageType.SUCCESS)
      emits('done')
    })
    .catch(error => {
      errorHandler(error)
    })
}

function refuse() {
  groupService.remove(props.request.group.id, props.request.user.id)
    .then(response => {
      console.log(response.data)
      alertStore.showAlert('Refuse user successfully', MessageType.SUCCESS)
      emits('done')
    })
    .catch(error => {
      errorHandler(error)
    })
}
</script>

<template>
  <v-card width="100%" class="mb-5">
    <template v-slot:prepend>
      <div class="d-flex justify-start">
        <v-avatar color="blue-darken-2" size="large" rounded="0">
          <v-img v-if="checkURL(props.request.group.url)" alt="John" :src="props.request.group?.url"></v-img>
          <span v-else class="text-h5">{{ props.request.group.name[0].toUpperCase() }}</span>
        </v-avatar>
        <div class="ml-3">
          <RouterLink :to="{name: 'profile-parent', params: {id : props.request.user.id}}">
            <v-card-title style="display: inline">{{ props.request.user.name }}</v-card-title>
          </RouterLink>
          <span style="display: inline; margin-left: 15px; margin-right: 15px">request to join</span>
          <RouterLink :to="{name: 'group-view', params: {slug : props.request.group.slug}}">
            <v-card-title style="display: inline">{{ props.request.group.name }}</v-card-title>
          </RouterLink>
        </div>
      </div>
    </template>
    <v-card-actions>
      <v-btn outline color="primary" @click="accept">Accept</v-btn>
      <v-btn outline color="error" @click="refuse">Refuse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>