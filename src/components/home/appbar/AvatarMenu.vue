<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-avatar color="red" :size="55" class="ma-2" v-bind="props">
        <v-img v-if="checkURL(userStore.user.avatar)" alt="John" :src="userStore.user.avatar"></v-img>
        <span v-else class="text-h5">{{ userStore.avatarChar }}</span>
      </v-avatar>
    </template>
    <v-list>
      <RouterLink :to="{name: 'profile-parent', params: {id : userStore.user.id}}"><AvatarMenuItem title="Profile" icon="mdi-account" style="color: white;"></AvatarMenuItem></RouterLink>
      <AvatarMenuItem title="Logout" icon="mdi-logout-variant" @item-click.once="logout"></AvatarMenuItem>
    </v-list>
  </v-menu>
</template>

<script setup>
import AvatarMenuItem from './AvatarMenuItem.vue'
import { useUserStore } from '@/stores/user'
import { userService } from '@/service/userService'
import { RouterLink, useRouter } from 'vue-router'
import { errorHandler } from '@/utils/errorHandler'
import { checkURL } from '@/utils/fileUtils'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const toast = useToast()
const router = useRouter()
function logout() {
  userService.logout()
    .then((response) => {
        router.replace({name : 'login'})
        localStorage.setItem('token','')
      toast.success(response.data.message)
    })
    .catch((error) => {
      errorHandler(error)
    })
}
</script>