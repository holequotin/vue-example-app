<template>
    <v-container grid-list-xs fluid>
        <h2>Load more comments</h2>
        <v-list lines="two">
            <v-list-item v-for="n in 3" :key="n">
                <CommentCard></CommentCard>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script setup>
import CommentCard from './CommentCard.vue';
//const props = defineProps(['type'])
</script>