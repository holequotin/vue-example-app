<template>
    <v-container grid-list-xs class="d-flex justify-center">
        <NavigationButton icon="mdi-home"></NavigationButton>
        <NavigationButton icon="mdi-theater"></NavigationButton>
        <NavigationButton icon="mdi-shopping-outline"></NavigationButton>
        <NavigationButton icon="mdi-account-group"></NavigationButton>
        <NavigationButton icon="mdi-gamepad-variant-outline"></NavigationButton>
    </v-container>
</template>
<script setup>
import NavigationButton from './NavigationButton.vue';
</script>