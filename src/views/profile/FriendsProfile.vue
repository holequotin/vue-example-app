<template>
    <BaseProfile>
        <template #content>
            <FriendList></FriendList>
        </template>
    </BaseProfile>
</template>

<script setup>
import BaseProfile from './BaseProfile.vue';
import FriendList from './FriendList.vue';
</script>