<template>
    <v-container grid-list-xs fluid class="d-flex justify-start algin-center">
        <AvatarIcon :size="40" :user="user"></AvatarIcon>
        <v-text-field
            variant="solo-filled"
            placeholder="Add comment"
            width="80%"
        ></v-text-field>
        <v-file-input multiple label="File input" hide-input class="custom-file-input"></v-file-input>
        <v-btn class="ma-auto" icon="mdi-send" variant="plain" color="primary"></v-btn>
    </v-container>
</template>

<script setup>
import AvatarIcon from './AvatarIcon.vue';
import { ref } from 'vue'

const user = ref({
    "id": 2,
    "name": "Van Vinh",
    "email": "example1@gmail.com",
    "email_verified_at": null,
    "created_at": "2023-12-26T10:16:38.000000Z",
    "updated_at": "2023-12-26T10:16:38.000000Z",
    "phone_number": null
})
</script>
<style scoped>
.custom-file-input .v-file-input__text {
    display: none;
}
</style>