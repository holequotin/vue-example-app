<template>
    <v-layout class="rounded rounded-md d-flex justify-center align-center">
      <slot name="app-bar">
        <AppBar></AppBar>
      </slot>

      <slot name="left-drawer">
        <v-navigation-drawer location="left" width="360">
          <v-list>
            <v-list-item title="Drawer left"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </slot>

      <slot name="right-drawer">
        <v-navigation-drawer location="right" width="360">
          <v-list>
            <v-list-item title="Drawer right"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </slot>
      <slot name="main">
        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
          Main Content
        </v-main>
      </slot>
    </v-layout>
</template>

<script setup>


import AppBar from '@/components/home/appbar/AppBar.vue'
</script>
<style scoped>

</style>