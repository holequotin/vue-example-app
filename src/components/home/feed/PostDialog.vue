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
                <PostCard :post="post" width="100%" type="dialog" class="overflow-auto">
                </PostCard>
                <slot name="new-comment">
                    <NewComment></NewComment>
                </slot>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { defineProps} from 'vue';
import PostCard from './PostCard.vue';
import NewComment from './NewComment.vue';

const props = defineProps(['dialog','post'])
defineEmits(['toggle'])
</script>