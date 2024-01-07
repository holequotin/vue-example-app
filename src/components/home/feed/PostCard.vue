<template>
    <v-card class="mx-auto mt-5" :title="props.post.user.name" :subtitle="formatedDate" width="70%">
        <template v-slot:prepend>
            <v-avatar color="blue-darken-2" size="large">
                <span class="text-h5">{{ avatarChar }}</span>
            </v-avatar>
        </template>
        <template v-slot:append>
            <v-btn variant="plain" icon="mdi-dots-horizontal"></v-btn>
            <v-btn variant="plain" icon="mdi-close"></v-btn>
        </template>
        <slot name="text">
            <v-card-text v-if="props.post.content">
                {{props.post.content}}
            </v-card-text>
        </slot>
        <slot name="image">
            <v-img width="100%" aspect-ratio="16/9" cover v-if="props.post.imgPath"
                :src="props.post.imgPath"></v-img>
        </slot>
        <!--reaction infomation-->
        <PostInfo :post-reactions="props.post.reactions"></PostInfo>
        <v-divider></v-divider>
        <!--actions in post-->
        <v-container grid-list-xs fluid>
            <PostActions :post-reactions="post.reactions"></PostActions>
        </v-container>
    </v-card>
</template>

<script setup>
import PostActions from './PostActions.vue'
import PostInfo from './PostInfo.vue';
import moment from 'moment'
import { computed } from 'vue';
const props = defineProps(['post'])
const formatedDate = computed(() => {
    return moment(props.post.createdAt).fromNow()
})
const avatarChar = computed(() => {
    return props.post.user.name[0];
})
</script>