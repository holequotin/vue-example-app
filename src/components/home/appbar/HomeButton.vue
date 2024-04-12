<template>
    <RouterLink :to="{name: 'home'}">
        <v-btn class="ma-2 mr-4" variant="tonal" icon="mdi-facebook" color="primary" size="x-large" :elevation="24"></v-btn>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>