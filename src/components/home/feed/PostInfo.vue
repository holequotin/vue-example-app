<template>
    <v-container grid-list-xs fluid class="d-flex flex-row mt-1 align-center justify-space-between">
        <slot name="icon">
            <div>
                <v-tooltip v-for="react in showReact" v-bind:key="react.id" location="top">
                    <div>
                        <h3>{{ react.tooltip }}</h3>
                        <p v-for="user in react.users" v-bind:key="user.id"> {{ user.name }} </p>
                    </div>
                    <template v-slot:activator="{ props }">
                        <v-icon :icon="react.icon" size="small" :color="react.color" v-bind="props" />
                    </template>
                </v-tooltip>
                <span class="ml-2" v-if="totalReaction">{{ totalReaction }}</span>
            </div>
        </slot>

        <slot name="comment">
            <div style="display: flex; align-items: center; justify-content: space-between; width:170px;">
                <div>50 comment</div>
                <div>20 shares</div>
            </div>
        </slot>
    </v-container>
</template>
<script setup>
import { reactions } from '../../../utils/constants';
import { computed } from 'vue'

const props = defineProps(['postReactions'])
const reacted = computed(() => {
    const result = new Map()
    for(let i=0;i<props.postReactions.length;i++) {
        let oldValue = result.get(props.postReactions[i].type) || {id : props.postReactions[i].type, users : []};
        result.set(props.postReactions[i].type,{...oldValue,users : [...oldValue.users,props.postReactions[i].user]})
    }
    return Array.from(result.values());
})

const showReact = computed(() => {
    return reacted.value.map((item) => {
        return { ...item, ...reactions.find((element) => element.id === item.id) }
    })
})
const totalReaction = computed(() => {
    return reacted.value.reduce((total, currentValue) => {
        return total + currentValue.users.length
    }, 0)
})
</script>