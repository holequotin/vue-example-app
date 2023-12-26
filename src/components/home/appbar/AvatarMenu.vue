<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-avatar color="red" :size="55" class="ma-2" v-bind="props">
        <span class="text-h5">{{ userStore.avatarChar }}</span>
      </v-avatar>
    </template>
    <v-list>
      <AvatarMenuItem title="Profile" icon="mdi-account"></AvatarMenuItem>
      <AvatarMenuItem title="Logout" icon="mdi-logout-variant"></AvatarMenuItem>
    </v-list>
  </v-menu>
</template>

<script setup>
import AvatarMenuItem from './AvatarMenuItem.vue';
import { useUserStore } from '../../../stores/user';
const userStore = useUserStore()
</script>