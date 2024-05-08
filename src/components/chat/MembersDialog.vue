<script setup>
import { ref } from 'vue'
import { groupChatService } from '@/service/groupChatService'
import { errorHandler } from '@/utils/errorHandler'

const members = ref([])
const perPage = ref(15)
const props = defineProps(['id'])
const meta = ref({
  current_page: 0,
  last_page: 1
})

async function getGroupChatUsers() {
  groupChatService.getGroupChatUsers(props.id, meta.value.current_page + 1, perPage.value)
    .then(response => {
      members.value.push(...response.data.data)
      meta.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function load({ done }) {
  await getGroupChatUsers()
  if (meta.value.current_page === meta.value.last_page) done('empty')
  else {
    done('ok')
  }
}

function modelChange() {
  members.value = []
  meta.value = {
    current_page: 0,
    last_page: 1
  }
  getGroupChatUsers()
}


</script>

<template>
  <v-dialog max-width="500" @update:model-value="modelChange">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        color="primary"
        icon="mdi-account-group-outline"
        text="Open Dialog"
        v-bind="activatorProps"
        variant="text"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Members">
        <v-card-item>
          <v-infinite-scroll mode="manual" @load="load">
            <v-list>
              <v-list-item v-for="member in members" :key="member">
                <v-list-item-title>{{ member.user.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-infinite-scroll>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>