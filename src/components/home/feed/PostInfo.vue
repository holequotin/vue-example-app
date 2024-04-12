<template>
    <v-container grid-list-xs fluid class="d-flex flex-row mt-1 align-center justify-space-between">
        <slot name="icon">
            <div>
                <v-btn outline v-if="props.post.total_reaction != 0" color="primary" dark size="small" variant="text" @click="dialog = true">{{ props.post.total_reaction}} reactions</v-btn>
            </div>
        </slot>
    </v-container>
    <ReactionDialog :dialog="dialog" v-if="dialog" @toggle="toggle" :post="props.post"></ReactionDialog>
</template>
<script setup>
import ReactionDialog from './ReactionDialog.vue';
import {ref} from 'vue'
const props = defineProps(['post'])

const dialog = ref(false)

function toggle () {
    dialog.value = !dialog.value
}
</script>