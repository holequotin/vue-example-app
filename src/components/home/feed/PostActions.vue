<template>
    <v-row>
        <v-col>
            <v-select label="Select"
                density="compact" v-model="select" :items="items" @update:modelValue="react">
            </v-select>
        </v-col>
        <v-col>
            <v-btn variant="plain" block prepend-icon="mdi-share-outline" @click="commentDialog=true">
                Comment
            </v-btn>
        </v-col>
        <v-col>
            <v-btn variant="plain" block prepend-icon="mdi-share-outline">
                Share
            </v-btn>
        </v-col>
        <CommentDialog @toggle="commentDialog = !commentDialog" :dialog="commentDialog" :post="props.post"></CommentDialog>
    </v-row>

</template>
<script setup>
import {ref} from 'vue'
import { ReactionType } from '../../../utils/ReactionType';
import {reactionService} from '../../../service/reactionService'
import { errorHandler } from '../../../utils/errorHandler';
import CommentDialog from './CommentDialog.vue';

const props = defineProps(['post'])
const select = ref(null)

if(props.post.current_reaction != null)
{
    select.value = {title: ReactionType.get(props.post.current_reaction?.type), value: props.post.current_reaction.type}
}

let currentReaction = ref(props.post.current_reaction)

const convertMapToArray = (map) => {
    return Array.from(map, ([value, title]) => {
                                return { title, value }
                            });
}

const items = convertMapToArray(ReactionType)
function react(){
    if(select.value == null && currentReaction.value != null){
        reactionService.removeReaction(currentReaction.value.id)
            .then((response) => {
                console.log(response.data)
                currentReaction.value = null
            })
            .catch((error) => {
                errorHandler(error)
            })
        return
    }
    if(currentReaction.value != null){
        reactionService.updateReaction(currentReaction.value.id, select.value)
            .then((response) => {
                console.log(response.data)
                currentReaction.value = response.data.reaction
            })
            .catch((error) => {
                errorHandler(error)
            })
    }else{
        reactionService.storeReaction(props.post.id, select.value)
        .then((response) => {
            console.log(response.data)
            currentReaction.value = response.data.reaction
        })
        .catch((error) => {
            errorHandler(error)
        })
    }
}

const commentDialog = ref(false)

</script>
