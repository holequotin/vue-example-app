<script setup>
import { computed } from 'vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'
import { useUserStore } from '@/stores/user'

const props = defineProps(['status', 'group'])
const emits = defineEmits(['done', 'edit'])
const userStore = useUserStore()
const alertStore = useAlertStore()

const showJoin = computed(() => {
  return props.status == null && props.group.type == '1'
})

const showLeave = computed(() => {
  return props.status == '1' && props.group.owner.id != userStore.user.id
})

const showWaiting = computed(() => {
  return props.status == '0' && props.group.type == '0'
})

const showSendRequest = computed(() => {
  return props.status == null && props.group.type == '0'
})

const showEdit = computed(() => {
  return props.group.owner.id == userStore.user.id
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

function cancelRequest() {
  groupService.leaveGroup(props.group.id)
    .then((response) => {
      console.log(response.data)
      alertStore.showAlert('Cancel request successfully', MessageType.SUCCESS)
      emits('done')
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function sendRequest() {
  groupService.sendRequest(props.group.id)
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
  <v-btn v-if="showJoin" @click="join" variant="outlined" color="primary">Join</v-btn>
  <v-btn v-if="showLeave" @click="leave" variant="outlined" color="error">Leave</v-btn>
  <v-btn v-if="showWaiting" @click="cancelRequest" color="warning" variant="outlined">Cancel request</v-btn>
  <v-btn v-if="showSendRequest" @click="sendRequest" variant="outlined" color="primary">Send request</v-btn>
  <v-btn v-if="showEdit" @click="emits('edit')" color="primary" variant="outlined">Edit group</v-btn>
</template>

<style scoped>

</style>