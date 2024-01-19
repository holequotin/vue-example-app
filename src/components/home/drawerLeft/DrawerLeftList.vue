<template>
    <v-list>
        <UserListItem :user="user"></UserListItem>
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" rounded="xl">
            <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title >{{ item.text }}</v-list-item-title>
        </v-list-item>
    </v-list>
</template>
<script setup>
// import DrawerLeftListItem from './DrawerLeftListItem.vue';
import { ref } from 'vue'
import UserListItem from './UserListItem.vue';
const items = ref([
    { text: 'Friends', icon: 'mdi-account-multiple' },
    { text: 'Feeds', icon: 'mdi-newspaper-variant-multiple-outline' },
    { text: 'Groups', icon: 'mdi-account-group' },
    { text: 'Chat', icon: 'mdi-facebook-messenger'}
])
const user = ref({
    avatar : 'https://cdn.vuetifyjs.com/images/john.jpg',
    name : 'John'
})
</script>