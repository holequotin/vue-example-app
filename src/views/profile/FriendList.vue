<template>
  <v-container grid-list-xs style="width: 70%;">
    <v-card>
      <v-card-title>
        Friends
      </v-card-title>
      <v-card-item>
        <v-row>
          <v-col v-for="friend in friends" :key="friend.id" class="d-flex justify-start" cols="6">
            <v-avatar color="blue-darken-2" rounded="0" size="large">
              <v-img v-if="checkURL(friend.avatar)" :src="friend.avatar" alt="John"></v-img>
              <span v-else class="text-h5">{{ friend.name[0].toUpperCase() }}</span>
            </v-avatar>
            <div style="margin-left: 20px;">
              <RouterLink :to="`/profile/${friend.id}`"><span class="color-link"
                                                              style="font-size: larger;">{{ friend.name
                }}</span><span v-if="friend.nickname" class="color-link ml-2"
                               style="font-size: larger;">({{ friend.nickname }})</span></RouterLink>
            </div>

            <v-menu v-if="userStore.user.id == id">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item
                  @click="() => showNicknameDialog(friend.id)"
                >
                  <v-list-item-title>Set nickname</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-actions class="d-flex justify-center align-center">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="meta.last_page"
            :total-visible="7"
            @update:model-value="() => getFriends(props.id, page, perPage)"
          ></v-pagination>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>

  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      min-width="400"
      prepend-icon="mdi-account-edit"
      title="Set nickname"
    >
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Set"
          @click="() => {setNickname()}"
        ></v-btn>
      </template>
      <v-card-text>
        <v-form>
          <v-row dense>
            <v-text-field v-model="nickname.value" :error-messages="nickNameErrors?.errors?.nickname[0]">
            </v-text-field>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { checkURL } from '@/utils/fileUtils'
import { ref, watch, watchEffect } from 'vue'
import { friendService } from '@/service/friendService'
import { errorHandler } from '@/utils/errorHandler'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

const friends = ref([])
const props = defineProps(['id'])
const perPage = ref(12)
const meta = ref({
  last_page: 1
})
const page = ref(1)
const dialog = ref(false)
const nickname = ref({
  id: 1,
  value: ''
})
const nickNameErrors = ref({
  message: '',
  errors: {
    nickname: []
  }
})
const toast = useToast()
const userStore = useUserStore()

function getFriends(id, page, perPage) {
  friendService.getFriendsByUser(id, page, perPage)
    .then((response) => {
      friends.value = response.data.data
      meta.value = response.data.meta
    })
    .catch((error) => {
      errorHandler(error)
    })
}

watchEffect(() => {
  getFriends(props.id, page.value, perPage.value)
})

watch(dialog, () => {
  if (dialog.value === false) {
    nickname.value = {
      id: 1,
      value: ''
    }

    nickNameErrors.value = {
      message: '',
      errors: {
        nickname: []
      }
    }
  }
})

const showNicknameDialog = (userId) => {
  dialog.value = true
  nickname.value.id = userId
}

const setNickname = () => {
  const data = {
    _method: 'patch',
    nickname: nickname.value.value
  }
  friendService.setNickName(data, nickname.value.id)
    .then(response => {
      toast.success('Set nick name successfully')
      updateNickname(nickname.value.id, nickname.value.value)
      dialog.value = false
    })
    .catch(error => {
      nickNameErrors.value = error.response.data
    })
}

const updateNickname = (id, newNickname) => {
  friends.value = friends.value.map((item) => {
    if (item.id === id) return { ...item, nickname: newNickname }
    return item
  })
}

</script>
<style scoped>
.color-link {
  color: white;
}
</style>