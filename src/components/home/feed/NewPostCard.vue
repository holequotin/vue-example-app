<template>
    <v-card width="70%">
        <v-card-item>
            <v-container grid-list-xs fluid class="d-flex flex-row">
                <AvatarIcon></AvatarIcon>
            <v-text-field
                name="name"
                id="id"
                class="ma-2"
                placeholder="What is on your mind?"
            ></v-text-field>
            </v-container>
        </v-card-item>
    </v-card>
</template>

<script setup>
import AvatarIcon from './AvatarIcon.vue';
</script>