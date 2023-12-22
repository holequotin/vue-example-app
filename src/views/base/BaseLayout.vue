<template>
    <AppBar></AppBar>
    <v-layout class="rounded rounded-md">
        <slot name="appbar">
            <v-app-bar title="This is slot app bar">

            </v-app-bar>
        </slot>
        <v-navigation-drawer location="left">
            <v-list>
                <v-list-item title="Drawer left"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer location="right">
            <v-list>
                <v-list-item title="Drawer right"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            Main Content
        </v-main>
    </v-layout>
</template>

<script setup>
</script>