<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Friend request', icon: 'mdi-newspaper-variant-multiple', to: 'friend-request' },
  { text: 'Friend suggestion', icon: 'mdi-account-group-outline', to: 'friend-suggestion' }
])

</script>

<template>
  <v-navigation-drawer location="left" width="360">
    <v-list>
      <v-list-item><h1>Friends</h1></v-list-item>
      <RouterLink v-for="(item, i) in items" :key="i" :to="{ name: item.to }" :value="item">
        <v-list-item color="primary" rounded="xl">

          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </RouterLink>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>