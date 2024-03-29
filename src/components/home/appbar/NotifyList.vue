<script setup>
import { ref } from 'vue'
import NotifyItem from '@/components/home/appbar/NotifyItem.vue'
import { notificationService } from '@/service/notificationService'
// import { errorHandler } from '@/utils/errorHandler'

const items = ref([])
const currentPage = ref(0)
const meta = ref({})

async function getNotifications() {
  if (currentPage.value < meta.value?.last_page || currentPage.value === 0) {
    notificationService.getNotifications(currentPage.value + 1, 5)
      .then((response) => {
        console.log(response.data.data, currentPage.value, meta.value?.last_page)
        currentPage.value = response.data.meta.current_page
        meta.value = response.data.meta
        items.value.push(...response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

async function load({ done }) {
  // Perform API call
  await getNotifications()
  done('empty')
}
</script>

<template>
  <h1>{{ items.length }}</h1>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn class="ma-2" variant="tonal" icon="mdi-bell-outline" size="large" :elevation="12" v-bind="props"></v-btn>
    </template>
    <v-infinite-scroll :height="500" :items="items" :onLoad="load" color="secondary" class="infinite">
      <template v-for="(item, index) in items" :key="item">
        <NotifyItem :title="item.type" :body="item.id"></NotifyItem>
      </template>
    </v-infinite-scroll>
  </v-menu>
</template>

<style scoped>
.notify-card {
  width: 300px;
  height: 100px;
}

.infinite {
  background-color: #615656;
}
</style>