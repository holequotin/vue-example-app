<template>
 <v-list density="compact">
      <v-list-subheader>CONTACTS</v-list-subheader>
        <UserListItem v-for="(user,i) in users" :key="i" :value="user" :user="user">

        </UserListItem>
    </v-list>
</template>

<script setup>
import { ref } from 'vue'
import UserListItem from '../drawerLeft/UserListItem.vue';
const users = ref([
    { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
    { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
    { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
    { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
    { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' }
])
</script>