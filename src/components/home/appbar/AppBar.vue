<template>
    <v-app-bar>
        <template #prepend>
            <v-container grid-list-xs class="d-flex flex-row justify-center" style="width: 400px;">
                <HomeButton></HomeButton>
                <SearchBox></SearchBox>
            </v-container>
        </template>
        <template #append>
            <v-container grid-list-xs class="d-flex flex-row justify-end" style="width: 400px;">
                <v-btn class="ma-2" variant="tonal" icon="mdi-menu" size="large" :elevation="12"></v-btn>
                <v-btn class="ma-2" variant="tonal" icon="mdi-facebook-messenger" size="large" :elevation="12"></v-btn>
                <v-btn class="ma-2" variant="tonal" icon="mdi-bell-outline" size="large" :elevation="12"></v-btn>
                <AvatarMenu></AvatarMenu>
            </v-container>
        </template>
        <template #default>
            <NavigationBar></NavigationBar>
        </template>
    </v-app-bar>
</template>

<script setup>
import SearchBox from './SearchBox.vue';
import HomeButton from './HomeButton.vue';
import NavigationBar from './NavigationBar.vue';
import AvatarMenu from './AvatarMenu.vue'
</script>