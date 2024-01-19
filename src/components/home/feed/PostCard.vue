<template>
    <v-card class="mx-auto mt-5" :title="props.post.user.name" :subtitle="props.post.createdAt ? formatedDate : null" width="100%">
        <template v-slot:prepend>
            <v-avatar color="blue-darken-2" size="large">
                <span class="text-h5">{{ avatarChar }}</span>
            </v-avatar>
        </template>
        <template v-slot:append>
            <v-btn variant="plain" icon="mdi-dots-horizontal"></v-btn>
            <v-btn variant="plain" icon="mdi-close" v-if="$props.type === 'feed'"></v-btn>
        </template>
        <slot name="text">
            <v-card-text v-if="props.post.content">
                {{ props.post.content }}
            </v-card-text>
        </slot>
        <slot name="image">
            <v-img width="100%" aspect-ratio="16/9" cover v-if="props.post.imgPath" :src="props.post.imgPath"></v-img>
        </slot>
        <!--reaction infomation-->
        <slot name="actions">
            <PostInfo :post-reactions="post.reactions"></PostInfo>
            <v-divider></v-divider>
            <!--actions in post-->
            <v-container grid-list-xs fluid>
                <PostActions :post-reactions="post.reactions" :post="post" :type="props.type" @comment-click="toggleDialog">
                </PostActions>
            </v-container>
            <v-divider></v-divider>
            <slot name="comment-list">
                <CommentList :comments="post.comments" :type="props.type" @load-comment="toggleDialog"></CommentList>
            </slot>
            <v-divider></v-divider>
            <PostDialog :dialog="dialog" @toggle="dialog = !dialog" :post="post"></PostDialog>
        </slot>
    </v-card>
</template>

<script setup>
import PostActions from './PostActions.vue'
import PostInfo from './PostInfo.vue';
import PostDialog from './PostDialog.vue';
import moment from 'moment'
import { computed, ref } from 'vue';
//import { useUserStore } from '../../../stores/user';
import CommentList from './CommentList.vue';

//const userStore = useUserStore()
const props = defineProps(['post', 'type'])
const dialog = ref(false)
const formatedDate = computed(() => {
    return moment(props.post.createdAt).fromNow()
})
const avatarChar = computed(() => {
    return props.post.user.name[0];
})
function toggleDialog() {
    console.log('change')
    dialog.value = !dialog.value
}
</script>