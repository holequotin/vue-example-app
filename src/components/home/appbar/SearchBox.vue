<template>
        <v-text-field
            name="name"
            label="Search some one"
            id="id"
            class="search mt-2"
            variant="underlined"
            append-inner-icon="mdi-magnify"
            @click:append-inner="search"
            v-model="searchValue"
        ></v-text-field>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const searchValue = ref('')
const router = useRouter()
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
function search() {
  if(searchValue.value.trim()) {
    searchStore.$reset()
    searchStore.searchUsers(searchValue.value)
    router.push({name: 'search',query: {search: searchValue.value}})
  }
}
</script>
<style scoped>
    .search {
        width: 70%;
    }
</style>