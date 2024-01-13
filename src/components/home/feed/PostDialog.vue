<!-- eslint-disable vue/no-mutating-props -->
<template>
    <BaseDialog :dialog="props.dialog" @toggle="$emit('toggle')">
        <template #title>
            <span>This is post dialog title</span>
        </template>
        <template #content>
            <PostCard :post="post" width="100%" type="dialog" class="overflow-auto">
            </PostCard>
            <NewComment :user="userStore.user" :post="post"></NewComment>
        </template>
    </BaseDialog>
</template>
<script setup>
import { defineProps } from 'vue';
import PostCard from './PostCard.vue';
import NewComment from './NewComment.vue';
import { useUserStore } from '../../../stores/user';
import BaseDialog from './BaseDialog.vue';

const userStore = useUserStore()
const props = defineProps(['dialog', 'post'])
defineEmits(['toggle'])
</script>