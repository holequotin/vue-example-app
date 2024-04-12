<template>
    <v-list-item @click="$emit('itemClick')" :prepend-icon="props.icon">
        <v-list-item-title>
            {{ props.title }}
        </v-list-item-title>
    </v-list-item>
</template>
<script setup>
const props = defineProps(['title','icon'])
</script>