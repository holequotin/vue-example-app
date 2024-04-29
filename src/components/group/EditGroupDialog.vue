<script setup>

import BaseDialog from '@/components/home/feed/BaseDialog.vue'
import { ref, watchEffect } from 'vue'
import { errorHandler } from '@/utils/errorHandler'
import { useAlertStore } from '@/stores/alert'
import { groupService } from '@/service/groupService'
import { MessageType } from '@/utils/MessageType'
import { useRouter } from 'vue-router'

const props = defineProps(['dialog', 'group'])
const alertStore = useAlertStore()
const router = useRouter()

const emits = defineEmits(['toggle', 'edited'])

const data = ref({
  name: props.group.name,
  type: props.group.type
})

const image = ref(null)

const items = [
  { title: 'Public', value: '1' },
  { title: 'Private', value: '0' }
]

function update() {
  let groupData = {
    ...data.value,
    type: data.value.type,
    image: image.value ? image.value[0] : null
  }

  groupService.updateGroup(props.group.id, groupData)
    .then(response => {
      console.log(response.data)
      alertStore.showAlert('Update group successfully', MessageType.SUCCESS)
      router.replace({ name: 'group-view', params: { slug: response.data.slug } })
      emits('toggle')
    })
    .catch(error => {
      errorHandler(error)
    })
}

watchEffect(() => {
  console.log(JSON.stringify(data.value))
})

</script>

<template>
  <BaseDialog :dialog="props.dialog" @toggle="$emit('toggle')" :width="600">
    <template #title>
            <span>
                Update Group
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
          <v-btn color="primary" block @click="update">Update group</v-btn>
        </v-container>
      </v-form>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>