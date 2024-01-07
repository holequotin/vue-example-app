<template>
    <v-list-item key="0" :value="props.user">
        <template v-slot:prepend>
            <v-avatar v-if="props.user.avatar">
                <v-img :src="props.user.avatar" alt="John"></v-img>
            </v-avatar>
            <v-avatar v-else color="red">
                <span class="text-h5">{{ avatarChar }}</span>
            </v-avatar>
        </template>
        <v-list-item-title >{{ props.user.name }}</v-list-item-title>
    </v-list-item>
</template>

<script setup>
import {computed} from 'vue'
import {getAvatarChar} from '../../../utils/stringUtils'
const props = defineProps(['user'])
const avatarChar = computed(() => {
    if(props.user.name) {
        return getAvatarChar(props.user.name)
    }
    return 'A'
})
</script>