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
        <PostInfo :post-reactions="reactionRef"></PostInfo>
        <v-divider></v-divider>
        <!--actions in post-->
        <v-container grid-list-xs fluid>
            <PostActions :post-reactions="reactionRef" :post-id="post.id" @update-reactions="updateReaction"></PostActions>
        </v-container>
    </v-card>
</template>

<script setup>
import PostActions from './PostActions.vue'
import PostInfo from './PostInfo.vue';
import moment from 'moment'
import { computed,ref, watchEffect } from 'vue';
import { useUserStore } from '../../../stores/user';

const userStore = useUserStore()
const props = defineProps(['post'])
const reactionRef = ref(props.post.reactions)
const formatedDate = computed(() => {
    return moment(props.post.createdAt).fromNow()
})
const avatarChar = computed(() => {
    return props.post.user.name[0];
})
function updateReaction(reaction) {
    if(reaction) {
        let isExisted = false;
        reactionRef.value = reactionRef.value.map((item) => {
            if(item.user.id === userStore.user.id) {
                isExisted = true;
                return {...item,type : reaction.id}
            } else {
                return item;
            }
        })
        if(!isExisted) {
            reactionRef.value.push({post_id : props.post.id, user : userStore.user,type : reaction.id})
        }
    }else{
        reactionRef.value = reactionRef.value.filter((item) => {
            return item.user.id !== userStore.user.id
        })
    }
}
watchEffect(() => {
    reactionRef.value = props.post.reactions
})
</script>