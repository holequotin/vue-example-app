<template>
    <v-list-item key="0" :value="props.user">
        <template v-slot:prepend>
            <v-avatar>
                <v-img :src="props.user.avatar" alt="John"></v-img>
            </v-avatar>
        </template>
        <v-list-item-title >{{ props.user.name }}</v-list-item-title>
    </v-list-item>
</template>

<script setup>
const props = defineProps(['user'])
</script>