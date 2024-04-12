<template>
    <v-btn icon :color="props.color" @click="$emit('handleReact')">
        <v-icon>{{ props.icon }}</v-icon>
        <v-tooltip activator="parent" location="top">{{ props.tooltip }}</v-tooltip>
    </v-btn>
</template>

<script setup>
const props = defineProps(['color','icon','tooltip'])
defineEmits(['handleReact'])
</script>