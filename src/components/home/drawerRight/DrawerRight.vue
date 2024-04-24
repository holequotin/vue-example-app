<template>
    <v-navigation-drawer location="right" width="360">
      <DrawerRightList :friends="friends"></DrawerRightList>
    </v-navigation-drawer>
</template>
<script setup>
import DrawerRightList from './DrawerRightList.vue'
import { ref } from 'vue'

const friends = ref([])
</script>