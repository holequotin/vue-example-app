<script setup>
import { ref } from 'vue'
import { groupChatService } from '@/service/groupChatService'
import { errorHandler } from '@/utils/errorHandler'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const dialog = ref(false)
const props = defineProps(['id'])
const toast = useToast()
const router = useRouter()

function leave() {
  groupChatService.leave(props.id)
    .then(response => {
      dialog.value = false
      router.replace({ name: 'chat-group' })
      toast.success(response.data.message)
    })
    .catch(error => errorHandler(error))
}
</script>

<template>
  <div class="text-center pa-4">
    <v-btn color="red" icon="mdi-arrow-right-bold-outline" @click="dialog = true">
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-account-alert"
        text="Are you sure to leave the group?"
        title="Leave group"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Cancel"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
          <v-btn
            class="ms-auto"
            color="red"
            text="Leave"
            variant="outlined"
            @click="leave"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>