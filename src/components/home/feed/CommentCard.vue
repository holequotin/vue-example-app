<template>
    <div class="d-flex justify-start align-center">
        <AvatarIcon :user="props.user" :size="40" class="mb-2"></AvatarIcon>
        <v-card variant="tonal" class="rounded-xl">
            <v-card-item>
                <v-card-title class="title">
                    {{ user.name }}
                </v-card-title>
                <v-card-content class="content">
                    {{ props.comment.content }}
                </v-card-content>
            </v-card-item>
        </v-card>
    </div>
</template>
<script setup>
import AvatarIcon from './AvatarIcon.vue';
const props = defineProps(['user','comment']);

</script>

<style scoped>
.title {
    font-size: 17px;
}

.content {
    font-size: 15px;
}
</style>