<template>
    <v-container grid-list-xs style="width: 70%;">
        <v-card>
            <v-card-title>
                Friends
            </v-card-title>
            <v-card-item>
                <v-row>
                    <v-col cols="6" v-for="friend in friends" :key="friend.id" class="d-flex justify-start">
                      <v-avatar color="blue-darken-2" rounded="0" size="large">
                        <v-img v-if="checkURL(friend.avatar)" :src="friend.avatar" alt="John"></v-img>
                        <span v-else class="text-h5">{{ friend.name[0].toUpperCase() }}</span>
                      </v-avatar>
                        <div style="margin-left: 20px;">
                            <RouterLink :to="`/profile/${friend.id}`"><span style="font-size: larger;" class="color-link">{{ friend.name }}</span></RouterLink>
                        </div>
                    </v-col>
                </v-row>
            </v-card-item>
          <v-card-actions class="d-flex justify-center align-center">
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="meta.last_page"
                :total-visible="7"
                @update:model-value="() => getFriends(props.id, page, perPage)"
              ></v-pagination>
            </div>
          </v-card-actions>
        </v-card>
    </v-container>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { checkURL } from '@/utils/fileUtils'
import { ref, watchEffect } from 'vue'
import { friendService } from '@/service/friendService'
import { errorHandler } from '@/utils/errorHandler'

const friends = ref([])
const props = defineProps(['id'])
const perPage = ref(12)
const meta = ref({
  last_page: 1
})
const page = ref(1)

function getFriends(id, page, perPage) {
  friendService.getFriendsByUser(id, page, perPage)
    .then((response) => {
      friends.value = response.data.data
      meta.value = response.data.meta
    })
    .catch((error) => {
      errorHandler(error)
    })
}

watchEffect(() => {
  getFriends(props.id, page.value, perPage.value)
})

</script>
<style scoped>
 .color-link {
    color: white;
 }
</style>