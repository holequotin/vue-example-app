<template>
    <BaseLayout>
        <template #appbar>
            <AppBar></AppBar>
        </template>
        <template #main>
            <v-main class="d-flex align-center justify-center flex-column" style="min-height: 300px;">
                <h1 v-if="friendships.length == 0">There are no friend requests</h1>
                <FriendRequest v-else v-for="friendship in friendships" v-bind:key="friendship.id" :friendship="friendship"
                    @accept="() => getFriendRequests(currentPage)" @refuse="() => getFriendRequests(currentPage)"></FriendRequest>
              <div class="text-center">
                <v-pagination
                  v-model="currentPage"
                  :length="meta.last_page"
                  :total-visible="7"
                  @update:model-value="() => getFriendRequests(currentPage)"
                ></v-pagination>
              </div>
            </v-main>
        </template>
        <template #left-drawer>
            <DrawerLeft></DrawerLeft>
        </template>
        <template #right-drawer>
          <div></div>
        </template>
    </BaseLayout>
</template>
<script setup>
import BaseLayout from './base/BaseLayout.vue'
import AppBar from '../components/home/appbar/AppBar.vue'
import DrawerLeft from '../components/home/drawerLeft/DrawerLeft.vue'
import { useUserStore } from '@/stores/user'
import { ref, watchEffect } from 'vue'
import { friendService } from '@/service/friendService'
import { errorHandler } from '@/utils/errorHandler'
import FriendRequest from '../components/friends/FriendRequest.vue'


const userStore = useUserStore()
const user = ref(userStore.user);
const friendships = ref([])
const currentPage = ref(1)
const meta = ref({
  last_page: 1
})
userStore.getUser()

user.value = userStore.user

watchEffect(() => {
    getFriendRequests(currentPage.value)
})

function getFriendRequests(page) {
    friendService.getFriendRequests(page)
        .then((response) => {
            console.log(response.data)
            friendships.value = response.data.data
          meta.value = response.data.meta
        })
        .catch((error) => {
            errorHandler(error)
        })
}
</script>