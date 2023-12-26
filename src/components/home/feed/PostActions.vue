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
import { ref } from 'vue'
const hasReaction = ref(false)
const reactions = [
    { color: 'primary', tooltip: 'Like', icon: 'mdi-thumb-up' },
    { color: 'pink', tooltip: 'Love', icon: 'mdi-heart' },
    { color: 'yellow lighten-2', tooltip: 'Sad', icon: 'mdi-emoticon-sad' },
    { color: 'yellow lighten-2', tooltip: 'Haha', icon: 'mdi-emoticon-lol' },
    { color: 'yellow lighten-2', tooltip: 'Angry', icon: 'mdi-emoticon-angry' },
]
const currReaction = ref({
    tooltip: 'Like',
    icon: 'mdi-thumb-up-outline',
    color: 'none'
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
