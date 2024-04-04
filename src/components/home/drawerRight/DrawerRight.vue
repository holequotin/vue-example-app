<template>
    <v-navigation-drawer location="right" width="360">
        <DrawerRightList :friends="friendStore.friends"></DrawerRightList>
    </v-navigation-drawer>
</template>
<script setup>
import DrawerRightList from './DrawerRightList.vue';
import { useFriendsStore } from '@/stores/friend';
const friendStore = useFriendsStore()
friendStore.getAllFriends()
</script>