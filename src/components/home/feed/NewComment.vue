<template>
    <v-container grid-list-xs fluid class="d-flex justify-start algin-center">
        <AvatarIcon :size="40" :user="props.user"></AvatarIcon>
        <v-text-field variant="solo-filled" placeholder="Add comment" width="80%" v-model="content"></v-text-field>
        <v-file-input label="File input" hide-input class="custom-file-input" v-model="image"></v-file-input>
        <v-btn class="ma-auto" icon="mdi-send" variant="plain" color="primary" :disabled="isButtonDisable"
            @click="storeComment"></v-btn>
    </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import AvatarIcon from './AvatarIcon.vue';
import { commentService } from '../../../service/commentService'
import { usePostStore } from '../../../stores/post';
import { errorHandler } from '../../../utils/errorHandler';
const props = defineProps(['user', 'post'])
const postStore = usePostStore()
const content = ref(null);
const image = ref(null)
const isButtonDisable = computed(() => {
    if (content.value || image.value) return false
    return true
})
function storeComment() {
    const data = {
        content: content?.value,
        image: image.value ? image.value[0] : null,
        post_id: props.post.id
    }
    commentService.storeComment(data).then((response) => {
        // add to store here
        postStore.storeComment(props.post.id, response.data)
        content.value = null
        image.value = null
    }).catch((error) => {
        errorHandler(error)
    })
}
</script>
<style scoped>
.custom-file-input .v-file-input__text {
    display: none;
}
</style>