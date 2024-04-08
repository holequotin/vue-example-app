<script setup>
import { computed } from 'vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'

const props = defineProps(['status', 'group'])
const emits = defineEmits(['done'])
const alertStore = useAlertStore()
const showJoin = computed(() => {
  return props.status == null && props.group.type == '1'
})

const showLeave = computed(() => {
  return props.status == '1'
})

const showWaiting = computed(() => {
  return props.status == '0' && props.group.type == '0'
})

const showSendRequest = computed(() => {
  return props.status == null && props.group.type == '0'
})

function join() {
  groupService.joinGroup(props.group.id)
    .then((response) => {
      alertStore.showAlert(response.data.message, MessageType.SUCCESS)
      emits('done')
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function leave() {
  groupService.leaveGroup(props.group.id)
    .then((response) => {
      alertStore.showAlert(response.data.message, MessageType.SUCCESS)
      emits('done')
    })
    .catch((error) => {
      errorHandler(error)
    })
}
</script>

<template>
  <v-btn v-if="showJoin" @click="join">Join</v-btn>
  <v-btn v-if="showLeave" @click="leave">Leave</v-btn>
  <v-btn v-if="showWaiting">Waiting</v-btn>
  <v-btn v-if="showSendRequest">Send request</v-btn>
</template>

<style scoped>

</style>