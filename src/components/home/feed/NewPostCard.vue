<template>
    <v-card width="100%" class="mb-5">
        <v-card-item>
            <v-container grid-list-xs fluid class="d-flex flex-row">
                <AvatarIcon :user="userStore.user"></AvatarIcon>
            <v-btn rounded="xl" size="x-large" width="90%" variant="tonal" class="custom-text" @click="dialog = !dialog">What's your mind?</v-btn>
            </v-container>
        </v-card-item>
    </v-card>
  <CreatePostDialog :dialog="dialog" @toggle="dialog = !dialog" :group="props.group"
                    @created="$emit('created')"></CreatePostDialog>
</template>

<script setup>
import AvatarIcon from './AvatarIcon.vue'
import { useUserStore } from '@/stores/user'
import CreatePostDialog from './CreatePostDialog.vue'
import { ref } from 'vue'

const userStore = useUserStore()
const props = defineProps(['group'])
defineEmits(['created'])
userStore.getUser()
const dialog = ref(false)
</script>
<style scoped>
.custom-text{
    text-transform: none;
    justify-content: start;
}
</style>