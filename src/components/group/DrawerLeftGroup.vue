<script setup>
import { ref } from 'vue'
import CreateGroupDialog from '@/components/group/CreateGroupDialog.vue'

const items = ref([
  { text: 'Feed', icon: 'mdi-newspaper-variant-multiple', to: 'group-feed' },
  { text: 'Your groups', icon: 'mdi-account-group-outline', to: 'group-join' }
])

const dialog = ref(false)
</script>

<template>
  <v-navigation-drawer location="left" width="360">
    <v-list>
      <v-list-item><h1>Groups</h1></v-list-item>
      <RouterLink v-for="(item, i) in items" :key="i" :to="{ name: item.to }" :value="item">
        <v-list-item color="primary" rounded="xl">

          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </RouterLink>
      <v-list-item>
        <v-btn block color="primary" prepend-icon="mdi-plus" variant="tonal" @click="dialog = true">Create group</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <CreateGroupDialog :dialog="dialog" @created="console.log('created')" @toggle="dialog = !dialog"></CreateGroupDialog>
</template>

<style scoped>

</style>