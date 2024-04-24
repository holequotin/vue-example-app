<template>
    <v-list>
        <UserListItem :user="user"></UserListItem>
        <RouterLink v-for="(item, i) in items" :to="{ name: item.to }" :key="i" :value="item">
            <v-list-item color="primary" rounded="xl">

                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
        </RouterLink>
    </v-list>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import UserListItem from './UserListItem.vue'
import { useUserStore } from '@/stores/user'

const items = ref([
  { text: 'Friend request', icon: 'mdi-account-multiple', to: 'friend_request' },
  { text: 'Join Group Request', icon: 'mdi-newspaper-variant-multiple-outline', to: 'group_request' },
  { text: 'Groups', icon: 'mdi-account-group', to: 'group-feed' },
  { text: 'Chat', icon: 'mdi-facebook-messenger', to: 'chat' }
])
const userStore = useUserStore()
const user = ref({})
watchEffect(() => {
    user.value = userStore.user
})
</script>