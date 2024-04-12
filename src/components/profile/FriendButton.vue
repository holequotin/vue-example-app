<template>
    <v-btn outline color="primary" dark v-if="props.friendship == null" @click="$emit('send')">Send Friend
        Request</v-btn>
    <v-btn outline color="primary" dark v-if="waiting" @click="$emit('cancel')">Sended</v-btn>
    <v-btn outline color="primary" dark v-if="sendToMe" @click="$emit('accept')">Accept</v-btn>
    <v-btn outline color="error" dark v-if="sendToMe" @click="$emit('refuse')">Refuse</v-btn>
    <v-btn outline color="primary" dark v-if="isFriend" @click="$emit('unfriend')">Friend</v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user';

const props = defineProps(['friendship'])
defineEmits(['send', 'accept', 'unfriend', 'cancel', 'refuse'])
const userStore = useUserStore()

const waiting = computed(() => {
    if (props.friendship == null) return false;

    return (props.friendship.status == 'pending' && userStore.user.id == props.friendship.from_user.id)
})

const sendToMe = computed(() => {
    if (props.friendship == null) return false;

    return (props.friendship.status == 'pending' && userStore.user.id == props.friendship.to_user.id)
})

const isFriend = computed(() => {
    if (props.friendship == null) return false;

    return props.friendship.status == "accepted"
})
</script>