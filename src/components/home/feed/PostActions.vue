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
            <v-btn variant="plain" block prepend-icon="mdi-comment-outline" @click="dialog = !dialog" v-if="props.type === 'feed'">
                Comment
            </v-btn>
            <v-btn variant="plain" block prepend-icon="mdi-comment-outline" v-if="props.type === 'dialog'">
                Comment
            </v-btn>
            <PostDialog :dialog="dialog" @toggle="dialog =!dialog" :post="post"></PostDialog>
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
import { usePostStore } from '../../../stores/post';
import { reactionService } from '../../../service/reactionService'
import PostDialog from './PostDialog.vue';
import { ref } from 'vue'

const userStore = useUserStore()
const postStore = usePostStore()
const props = defineProps(['postReactions','type','post'])
const dialog = ref(false)

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
        postStore.deleteReaction(props.post.id)
        reactionService.removeReaction(props.post.id).then((response) => {
            console.log(response)
        }).catch((error) => {
            //handle error with alert
            console.log(error)
        })
    } else {
        //send request to update or store reaction
        postStore.storeReaction(props.post.id,reaction)
        if (currReaction.value.isReacted) {
            // update request
            reactionService.updateReaction(props.post.id, reaction.id).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            // store request
            reactionService.storeReaction(props.post.id, reaction.id).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }
        currReaction.value.color = reaction.color
        currReaction.value.icon = reaction.icon
        currReaction.value.tooltip = reaction.tooltip
        currReaction.value.isReacted == true
    }
    // send request here
}
</script> 
