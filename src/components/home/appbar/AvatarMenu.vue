<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-avatar color="red" :size="55" class="ma-2" v-bind="props">
        <span class="text-h5">{{ userStore.avatarChar }}</span>
      </v-avatar>
    </template>
    <v-list>
      <AvatarMenuItem title="Profile" icon="mdi-account"></AvatarMenuItem>
      <AvatarMenuItem title="Logout" icon="mdi-logout-variant" @item-click.once="logout"></AvatarMenuItem>
    </v-list>
  </v-menu>
</template>

<script setup>
import AvatarMenuItem from './AvatarMenuItem.vue';
import { useUserStore } from '../../../stores/user';
import {userService} from '../../../service/userService'
import { useAlertStore } from '../../../stores/alert';
import { useRouter } from 'vue-router';
import { MessageType } from '../../../utils/MessageType';
import { getMessage } from '../../../utils/errorHandler';
const userStore = useUserStore()
const alertStore = useAlertStore()
const router = useRouter()
function logout() {
  userService.logout()
    .then((response) => {
        router.replace({name : 'login'})
        localStorage.setItem('token','')
        alertStore.showAlert(response.data.message,MessageType.INFO)
    })
    .catch((error) => {
      const message = getMessage(error)
      alertStore.showAlert(message, MessageType.ERROR)
    })
}
</script>