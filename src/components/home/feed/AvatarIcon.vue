<template>
    <v-avatar color="red" :size="props.size" class="ma-2" v-bind="props">
        <v-img v-if="checkURL(user.avatar)" alt="John" :src="user.avatar"></v-img>
        <span v-else class="text-h5">{{ char }}</span>
    </v-avatar>
</template>

<script setup>
import { computed } from 'vue';
import { checkURL } from '@/utils/fileUtils'
const props = defineProps(['user','size'])
const char = computed(() => {
    if(props.user.name) {
        return props.user.name[0]
    }
    return 'A'
})
</script>