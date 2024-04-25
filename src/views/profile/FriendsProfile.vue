<template>
    <BaseProfile>
        <template #content>
          <FriendList :id="route.params.id"></FriendList>
          <v-divider></v-divider>
          <MutualFriends v-if="route.params.id != userStore.user?.id" :id="route.params.id"></MutualFriends>
        </template>
    </BaseProfile>
</template>

<script setup>
import BaseProfile from './BaseProfile.vue'
import FriendList from './FriendList.vue'
import { useRoute } from 'vue-router'
import MutualFriends from '@/components/friends/MutualFriends.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const route = useRoute()
</script>