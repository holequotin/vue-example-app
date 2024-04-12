<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="text-center">
        <v-dialog v-model="props.dialog" :width="props.width ? props.width : 800">
            <v-card>
                <template #append>
                    <v-btn icon="mdi-close" variant="plain" @click="dialog = $emit('toggle')"></v-btn>
                </template>
                <v-card-title class="d-flex justify-center align-center">
                    <slot name="title">
                        <span>This is title</span>
                    </slot>
                </v-card-title>
                <slot name="content">
                    This is content
                </slot>
                <slot name="actions">
                </slot>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['toggle'])
const props = defineProps(['dialog','width'])
</script>