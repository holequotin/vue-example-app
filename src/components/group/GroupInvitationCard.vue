<script setup>
import { computed } from 'vue'
import { groupInvitationService } from '@/service/groupInvitationService'
import { errorHandler } from '@/utils/errorHandler'
import { ReplyType } from '@/utils/ReplyType'

const props = defineProps(['invitation'])
const emits = defineEmits(['replied'])

function reply(type) {
  const data = {
    type: type
  }
  groupInvitationService.replyGroupInvitation(props.invitation.id, data)
    .then(response => {
      emits('replied')
    })
    .catch(error => {
      errorHandler(error)
    })
}

const avatarChar = computed(() => {
  return props.invitation.group.name[0]
})
</script>

<template>
  <v-card class="mb-5" width="70%">
    <template v-slot:prepend>
      <div class="d-flex justify-start">
        <v-avatar color="blue-darken-2" size="large">
          <span class="text-h5">{{ avatarChar }}</span>
        </v-avatar>
        <div class="ml-3">
          <RouterLink :to="{ name: 'group-view', params: { slug: invitation.group.slug } }" style="color: white;">
            <v-card-title><span style="color: green">{{ invitation.inviter.name }}</span> invite to join <span
              style="color: green">{{ invitation.group.name }}</span></v-card-title>
          </RouterLink>
        </div>
      </div>
    </template>
    <v-card-actions>
      <v-btn color="primary" outline @click="() => reply(ReplyType.ACCEPT)">Accept</v-btn>
      <v-btn color="error" outline @click="() => reply(ReplyType.REFUSE)">Refuse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>