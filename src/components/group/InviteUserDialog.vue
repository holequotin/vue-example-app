<script setup>
import BaseDialog from '@/components/home/feed/BaseDialog.vue'
import { ref } from 'vue'
import { groupService } from '@/service/groupService'
import { errorHandler } from '@/utils/errorHandler'
import CanInviteItem from '@/components/group/CanInviteItem.vue'

const props = defineProps(['dialog', 'id'])
const emits = defineEmits(['toggle'])
const users = ref([])
const perPage = ref(15)

const meta = ref({
  current_page: 0,
  last_page: 1
})

async function getUserCanInvite() {
  groupService.getUsersCanInvite(props.id, meta.value.current_page + 1, perPage.value)
    .then(response => {
      users.value.push(...response.data.data)
      meta.value = response.data.meta
    })
    .catch(error => {
      errorHandler(error)
    })
}

async function load({ done }) {
  await getUserCanInvite(props.id, meta.value.current_page + 1, perPage.value)
  if (meta.value.current_page === meta.value.last_page) {
    done('empty')
  } else {
    done('ok')
  }
}

getUserCanInvite()
</script>

<template>
  <BaseDialog :dialog="props.dialog" width="500px" @toggle="$emit('toggle')">
    <template #title>
            <span>
                Invite User
            </span>
    </template>

    <template #content>
      <v-infinite-scroll mode="manual" @load="load">
        <v-list lines="one" max-height="500px">
          <CanInviteItem v-for="user in users" :key="user" :group-id="id" :user="user"></CanInviteItem>
        </v-list>
      </v-infinite-scroll>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>