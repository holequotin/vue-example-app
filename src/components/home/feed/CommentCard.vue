<template>
    <div class="d-flex justify-start align-center">
        <AvatarIcon :user="props.user" :size="40" class="mb-2"></AvatarIcon>
        <v-card variant="tonal" class="rounded-xl">
            <v-card-item>
                <v-card-title class="title">
                    {{ user.name }}
                </v-card-title>
                <v-card-content class="content" v-if="props.comment.content">
                    {{ props.comment.content }}
                </v-card-content>
                <slot name="image">
                    <v-img width="100%" aspect-ratio="16/9" cover v-if="props.comment.imgPath"
                        :src="props.comment.imgPath"></v-img>
                </slot>
            </v-card-item>
        </v-card>
    </div>
</template>
<script setup>
import AvatarIcon from './AvatarIcon.vue';
const props = defineProps(['user', 'comment']);

</script>

<style scoped>
.title {
    font-size: 17px;
}

.content {
    font-size: 15px;
}
</style>