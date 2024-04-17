<script setup>

import DrawerLeftGroup from '@/components/group/DrawerLeftGroup.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <h1>This is group join</h1>
    </template>
    <template #left-drawer>
      <DrawerLeftGroup></DrawerLeftGroup>
    </template>
    <template #right-drawer>
      <div></div>
    </template>
  </BaseLayout>
</template>

<style scoped>

</style>