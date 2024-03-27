<template>
    <v-list-item key="0" :value="props.user">
        <template v-slot:prepend>
            <v-avatar color="red">
                <v-img v-if="user.avatar" alt="John" :src="user.avatar"></v-img>
                <span class="text-h5" v-else>{{ avatarChar }}</span>
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