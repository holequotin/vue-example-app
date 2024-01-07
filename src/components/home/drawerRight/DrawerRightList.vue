<template>
 <v-list density="compact">
      <v-list-subheader>CONTACTS</v-list-subheader>
        <UserListItem v-for="(friend,i) in props.friends" :key="i" :value="friend" :user="friend">

        </UserListItem>
    </v-list>
</template>

<script setup>
// import { ref } from 'vue'
import UserListItem from '../drawerLeft/UserListItem.vue';
const props = defineProps(['friends']);
// const users = ref([
//     { name: 'Friend Name'},
//     { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
//     { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
//     { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
//     { name: 'Friend Name', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' }
// ])
</script>