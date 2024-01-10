<template>
    <v-avatar color="red" :size="props.size" class="ma-2" v-bind="props">
        <span class="text-h5">{{ char }}</span>
    </v-avatar>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['user','size'])
const char = computed(() => {
    if(props.user.name) {
        return props.user.name[0]
    }
    return 'A'
})
</script>