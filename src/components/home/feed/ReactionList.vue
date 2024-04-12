<template>
    <v-list lines="two">
        <v-list-item v-for="reaction in props.reactions" :key="reaction.id">
            <v-list-item-title>{{ reaction.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ reaction.type }}</v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<script setup>
const props = defineProps(['reactions'])
</script>