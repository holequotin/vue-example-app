<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="text-center">
        <v-dialog v-model="props.dialog" :width="props.width ? props.width : 800">
            <v-card>
                <template #append>
                    <v-btn icon="mdi-close" variant="plain" @click="$emit('toggle')"></v-btn>
                </template>
                <v-card-title class="d-flex justify-center align-center">
                    <slot name="title">
                        <span>This is title</span>
                    </slot>
                </v-card-title>
                <slot name="content">
                    This is content
                </slot>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps(['dialog','width'])
defineEmits(['toggle'])
</script>