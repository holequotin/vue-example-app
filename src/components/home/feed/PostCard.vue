<template>
    <v-card class="mx-auto mt-5" title="This is title" subtitle="This is subtitle" width="90%">
        <template v-slot:prepend>
            <v-avatar color="blue-darken-2" size="large">
                <span class="text-h5">CJ</span>
            </v-avatar>
        </template>
        <template v-slot:append>
            <v-btn variant="plain" icon="mdi-dots-horizontal"></v-btn>
            <v-btn variant="plain" icon="mdi-close"></v-btn>
        </template>
        <slot name="text">
            <v-card-text>
                This is card Text
            </v-card-text>
        </slot>
        <slot name="image">
            <v-img width="100%" aspect-ratio="16/9" cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
        </slot>
        <v-container grid-list-xs fluid class="d-flex flex-row mt-1">
            <slot name="icon">
                <v-icon icon="$vuetify" size="x-small"></v-icon>
            </slot>
        </v-container>
        <v-divider></v-divider>
        <v-container grid-list-xs fluid>
            <PostActions></PostActions>
        </v-container>
    </v-card>
</template>

<script setup>
import PostActions from './PostActions.vue'
</script>