<template>
    <v-slide-x-transition>
      <v-alert :text="message" :type="type" class="alert-center w-50" @click="$emit('action')">
      </v-alert>
    </v-slide-x-transition>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps(['message', 'type'])
defineEmits(['action'])
</script>

<style scoped>
.alert-center {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2000;
}
</style>