<script setup>

import BaseDialog from '@/components/home/feed/BaseDialog.vue'
import { ref } from 'vue'
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'
import { groupService } from '@/service/groupService'
import { MessageType } from '@/utils/MessageType'

const props = defineProps(['dialog'])
const alertStore = useAlertStore()
const emits = defineEmits(['toggle', 'created'])
const data = ref({
  name: '',
  type: { title: 'Public', value: 1 }
})

const image = ref(null)

const items = [
  { title: 'Public', value: '1' },
  { title: 'Private', value: '0' }
]

function create() {
  let groupData = {
    ...data.value,
    type: data.value.type.value,
    image: image.value ? image.value[0] : null
  }

  groupService.createGroup(groupData)
    .then((response) => {
      console.log(response.data)
      alertStore.showAlert('Create group successfully', MessageType.SUCCESS)
      emits('toggle')
      emits('created')
    })
    .catch((error) => {
      errorHandler(error)
    })
}
</script>

<template>
  <BaseDialog :dialog="props.dialog" @toggle="$emit('toggle')" :width="600">
    <template #title>
            <span>
                Create Group
            </span>
    </template>
    <template #content>
      <v-form>
        <v-container>
          <v-row>
            <v-col class="v-col-12">
              <v-text-field v-model="data.name" label="Group name"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="v-col-6">
              <v-file-input prepend-icon="mdi-image" v-model="image" label="Image"></v-file-input>
            </v-col>
            <v-col class="v-col-6">
              <v-select v-model="data.type" :items="items" label="Type"></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-btn color="primary" block @click="create">Create group</v-btn>
        </v-container>
      </v-form>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>