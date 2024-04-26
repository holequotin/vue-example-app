<template>
  <BaseLayout>
    <template #appbar>
      <AppBar></AppBar>
    </template>
    <template #main>
      <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px;">
        <v-container fluid>
          <v-row>
            <v-col v-for="user in users" :key="user.id" class="v-col-3">
              <FriendSuggestionCard :user="user"></FriendSuggestionCard>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </template>
    <template #left-drawer>
      <DrawerLeftFriend></DrawerLeftFriend>
    </template>
    <template #right-drawer>
      <div></div>
    </template>
  </BaseLayout>
</template>
<script setup>
import DrawerLeftFriend from '@/components/friends/DrawerLeftFriend.vue'
import BaseLayout from '@/views/base/BaseLayout.vue'
import AppBar from '@/components/home/appbar/AppBar.vue'
import FriendSuggestionCard from '@/components/friends/FriendSuggestionCard.vue'
import { ref } from 'vue'
import { friendService } from '@/service/friendService'
import { errorHandler } from '@/utils/errorHandler'

const users = ref([])

function getFriendSuggestion() {
  friendService.getFriendSuggestion()
    .then(response => {
      users.value = response.data
    })
    .catch(error => {
      errorHandler(error)
    })
}

getFriendSuggestion()
</script>