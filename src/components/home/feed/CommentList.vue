<template>
    <v-container grid-list-xs fluid>
        <v-list lines="two">
            <v-list-item v-for="comment in props.comments" :key="comment.id">
                    <CommentCard :comment="comment" :user="comment.user" @deleted="$emit('deleted')"></CommentCard>
                </v-list-item>
        </v-list>
    </v-container>
</template>
<script setup>
import CommentCard from './CommentCard.vue';
const props = defineProps(['comments'])
const emit = defineEmits(['deleted'])
</script>