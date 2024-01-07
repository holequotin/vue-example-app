<template>
    <v-row>
        <v-col>
            <v-menu location="top" open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" block :prepend-icon="currReaction.icon"
                        :color="currReaction.color">
                        {{ currReaction.tooltip }}
                    </v-btn>
                </template>

                <v-toolbar>
                    <ReactionIcon v-for="reaction in reactions" :color="reaction.color" :tooltip="reaction.tooltip"
                        :icon="reaction.icon" v-bind:key="reaction.tooltip" @handle-react="react(reaction)">

                    </ReactionIcon>
                </v-toolbar>
            </v-menu>
        </v-col>
        <v-col>
            <v-btn variant="plain" block prepend-icon="mdi-comment-outline">
                Comment
            </v-btn>
        </v-col>
        <v-col>
            <v-btn variant="plain" block prepend-icon="mdi-share-outline">
                Share
            </v-btn>
        </v-col>
    </v-row>
</template>
<script setup>
import ReactionIcon from './ReactionIcon.vue';
import { computed } from 'vue'
import { reactions } from '../../../utils/constants';
import { useUserStore } from '../../../stores/user';
import { reactionService } from '../../../service/reactionService'

const userStore = useUserStore()
const props = defineProps(['postReactions', 'postId'])
const emit = defineEmits(['update-reactions'])

const currReaction = computed(() => {
    const result = props.postReactions.filter((item) => {
        return item.user.id === userStore.user.id
    })
    if (result.length > 0) {
        const final_result = reactions.find((item) => {
            return item.id === result[0].type
        })
        return { ...final_result, isReacted: true }
    }
    return {
        tooltip: 'Like',
        icon: 'mdi-thumb-up-outline',
        color: 'none',
        isReacted: false
    }
})

function react(reaction) {
    if (reaction.tooltip === currReaction.value.tooltip && currReaction.value.isReacted == true) {
        currReaction.value.color = 'none'
        currReaction.value.icon = 'mdi-thumb-up-outline'
        currReaction.value.tooltip = 'Like'
        currReaction.value.isReacted == false

        //send request to remove reaction here
        reactionService.removeReaction(props.postId).then((response) => {
            console.log(response)
        }).then((error) => {
            //handle error with alert
            console.log(error)
        })
        emit('update-reactions')
    } else {
        //send request to update or store reaction
        if (currReaction.value.isReacted) {
            // update request
            reactionService.updateReaction(props.postId, reaction.id).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            // store request
            reactionService.storeReaction(props.postId, reaction.id).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }
        currReaction.value.color = reaction.color
        currReaction.value.icon = reaction.icon
        currReaction.value.tooltip = reaction.tooltip
        currReaction.value.isReacted == true
        emit('update-reactions', reaction)
    }
    // send request here
}
</script> 
