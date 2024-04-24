<template>
    <BaseProfile>
        <template #content>
          <FriendList :id="route.params.id"></FriendList>
        </template>
    </BaseProfile>
</template>

<script setup>
import BaseProfile from './BaseProfile.vue'
import FriendList from './FriendList.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>