<template>
    <v-btn outline color="primary" dark size="x-large" class="ma-2">
        <v-icon :icon="props.icon" size="x-large"></v-icon>
    </v-btn>
</template>

<script setup>
const props = defineProps(['icon'])
</script>