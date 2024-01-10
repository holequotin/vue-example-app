<template>
    <div class="d-flex justify-start align-center">
        <AvatarIcon :user="user" :size="40" class="mb-2"></AvatarIcon>
        <v-card variant="tonal" class="rounded-xl">
            <v-card-item>
                <v-card-title class="title">
                    Hello
                </v-card-title>
                <v-card-content class="content">
                    This is content
                </v-card-content>
            </v-card-item>
        </v-card>
    </div>
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
.title {
    font-size: 17px;
}

.content {
    font-size: 15px;
}
</style>