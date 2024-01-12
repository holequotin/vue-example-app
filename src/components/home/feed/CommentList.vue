<template>
    <v-container grid-list-xs fluid>
        <div v-if="props.type === 'feed' && comments.length > 3">
            <v-btn variant="plain" @click="$emit('load-comment')">
                Load more comments
            </v-btn>
        </div>
        <v-list lines="two">
            <div v-if="props.type === 'feed'">
                <v-list-item v-for="n in list_size" :key="n">
                    <CommentCard :comment="comments[n - 1]" :user="comments[n - 1].user"></CommentCard>
                </v-list-item>
            </div>
            <div v-if="props.type === 'dialog'">
                <v-list-item v-for="comment in comments" :key="comment.id">
                    <CommentCard :comment="comment" :user="comment.user"></CommentCard>
                </v-list-item>
            </div>
        </v-list>
    </v-container>
</template>
<script setup>
import { computed } from 'vue';
import CommentCard from './CommentCard.vue';
const props = defineProps(['type', 'comments'])
defineEmits(['load-comment'])
const list_size = computed(() => {
    if (props.comments.length >= 3) return 3;
    return props.comments.length
})

</script>