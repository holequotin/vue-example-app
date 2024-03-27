<template>
    <BaseDialog :dialog="props.dialog" @toggle="close" :width="600">
        <template #title>
            <span>
                Reactions
            </span>
        </template>
        <template #content>
            <v-container grid-list-xs>
                <v-row width="50%">
                    <v-select :items="items" density="compact" label="Type" v-model="type"></v-select>
                </v-row>
            </v-container>
            <ReactionList :reactions="reactions"></ReactionList>
            <v-container grid-list-xs style="width: 80%;">
                <v-row class="d-flex justify-space-between">
                    <v-btn outline color="primary" dark @click="previousPage">Previous</v-btn>
                    <span>Current page: {{ currentPage }}</span>
                    <v-btn outline color="primary" dark @click="nextPage">Next</v-btn>
                </v-row>
            </v-container>
        </template>
    </BaseDialog>
</template>
<script setup>
import BaseDialog from './BaseDialog.vue';
import ReactionList from './ReactionList.vue';
import { watchEffect, ref } from 'vue'
import { errorHandler } from '../../../utils/errorHandler';
import { reactionService } from '../../../service/reactionService';
import { ReactionType } from '../../../utils/ReactionType';
const props = defineProps(['dialog', 'post'])
const emit = defineEmits(['toggle'])

const reactions = ref([])
const currentPage = ref(1)
const type = ref(null)

function close() {
    emit('toggle')
}

watchEffect(() => {
    getReactions(currentPage.value, type.value)
})

function getReactions(page, type) {
    reactionService.getReactionsByPost(props.post.id, type, page, 6)
        .then((response) => {
            console.log(response.data)
            reactions.value = response.data
        })
        .catch((error) => {
            errorHandler(error)
        })
}

function nextPage() {
    currentPage.value++
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const convertMapToArray = (map) => {
    return Array.from(map, ([value, title]) => {
        return { title, value }
    });
}

const items = convertMapToArray(ReactionType)
</script>