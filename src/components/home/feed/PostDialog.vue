<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="text-center">
        <v-dialog v-model="props.dialog" width="800">
            <v-card>
                <template #append>
                    <v-btn icon="mdi-close" variant="plain" @click="$emit('toggle')"></v-btn>
                </template>
                <v-card-title class="d-flex justify-center align-center">
                    <span class="text-h5">Use Google's location service?</span>
                </v-card-title>
                <PostCard :post="post" width="100%">
                    
                </PostCard>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
import PostCard from './PostCard.vue';
const post = ref({
    "id": 7,
    "content": "Test refresh token",
    "imgPath": null,
    "createdAt": "2024-01-02T04:27:52.000000Z",
    "user": {
        "id": 2,
        "name": "Van Vinh",
        "email": "example1@gmail.com",
        "phone_number": null
    },
    "reactions": [
        {
            "id": 30,
            "post_id": 7,
            "user": {
                "id": 2,
                "name": "Van Vinh",
                "email": "example1@gmail.com",
                "phone_number": null
            },
            "type": 1,
            "created_at": "2024-01-08T16:33:05.000000Z",
            "updated_at": "2024-01-08T16:33:08.000000Z"
        },
        {
            "id": 31,
            "post_id": 7,
            "user": {
                "id": 1,
                "name": "Ho Le Quoc Tin",
                "email": "example@gmail.com",
                "phone_number": null
            },
            "type": 4,
            "created_at": "2024-01-08T16:33:30.000000Z",
            "updated_at": "2024-01-08T16:50:21.000000Z"
        }
    ]
})
const props = defineProps(['dialog'])
defineEmits(['toggle'])
</script>