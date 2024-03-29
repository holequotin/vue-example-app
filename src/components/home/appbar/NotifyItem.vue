<script setup>
const props = defineProps(['title', 'body'])
const emit = defineEmits(['action'])
</script>

<template>
  <v-list-item>
    <v-card @click="emit('action')" class="notify-card">
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text>{{ props.body }}</v-card-text>
    </v-card>
  </v-list-item>
</template>

<style scoped>
.notify-card {
  width: 300px;
  height: 100px;
}
</style>