<script setup>

import ContactCard from '@/components/chat/ContactCard.vue'
</script>

<template>
  <v-navigation-drawer location="left" width="350">
    <v-list>
      <v-list-item v-for="n in 10" @click="console.log('Hello')" :key="n">
        <ContactCard></ContactCard>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>