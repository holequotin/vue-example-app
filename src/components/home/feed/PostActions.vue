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
import { computed, ref } from 'vue'
import { reactions } from '../../../utils/constants';
import { useUserStore } from '../../../stores/user'

const userStore = useUserStore()
const props = defineProps(['postReactions'])
const hasReaction = ref(false)

// const currReaction = ref({
//     tooltip: 'Like',
//     icon: 'mdi-thumb-up-outline',
//     color: 'none'
// })

const currReaction = computed(() => {
    const result = props.postReactions.filter((item) => {
        return item.user.id === userStore.user.id
    })
    if (result.length > 0) {
        const final_result = reactions.find((item) => {
            return item.id === result[0].type
        })
        return final_result
    }
    return {
        tooltip: 'Like',
        icon: 'mdi-thumb-up-outline',
        color: 'none'
    }
})

function react(reaction) {
    if (reaction.tooltip === currReaction.value.tooltip && hasReaction.value == true) {
        currReaction.value.color = 'none'
        currReaction.value.icon = 'mdi-thumb-up-outline'
        currReaction.value.tooltip = 'Like'
        hasReaction.value = false

        //send request here
    } else {
        currReaction.value.color = reaction.color
        currReaction.value.icon = reaction.icon
        currReaction.value.tooltip = reaction.tooltip
        hasReaction.value = true
    }

    // send request here
}
</script> 
