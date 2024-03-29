<template>
    <v-card class="mx-auto mb-5" width="100%">
      <template v-slot:prepend>
        <div class="d-flex justify-start">
          <v-avatar color="blue-darken-2" size="large">
            <v-img v-if="post.user.avatar" alt="John" :src="post.user.avatar"></v-img>
            <span v-else class="text-h5">{{ avatarChar }}</span>
          </v-avatar>
          <div class="ml-3">
            <RouterLink :to="{ name: 'profile-parent', params: { id: post.user.id } }" style="color: white;">
              <v-card-title>{{ post.user.name }}</v-card-title>
            </RouterLink>
            <v-card-subtitle>
              {{ props.post.created_at ? formatedDate : null }}
            </v-card-subtitle>
          </div>
        </div>
      </template>
      <template v-slot:append>
        <v-menu v-if="userStore.user.id == post.user.id">
          <template v-slot:activator="{ props }">
            <v-btn variant="plain" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item @click="dialog = true">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deletePost">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <UpdatePostDialog :dialog="dialog" @toggle="toggle" :post="post">
        </UpdatePostDialog>
      </template>
      <slot name="text">
        <v-card-text v-if="props.post.body">
          {{ props.post.body }}
        </v-card-text>
      </slot>
      <slot name="image">
        <v-row>
          <v-col>
            <v-img v-for="image in props.post.images" v-bind:key="image.id" width="100%" aspect-ratio="16/9"
                   cover :src="image.url"></v-img>
          </v-col>
        </v-row>
      </slot>
      <!--reaction infomation-->
      <slot name="actions">
        <PostInfo :post="post"></PostInfo>
        <v-divider></v-divider>
        <v-container grid-list-xs fluid>
          <PostActions :post="post">
          </PostActions>
        </v-container>
        <v-divider></v-divider>
      </slot>
    </v-card>
</template>

<script setup>
import PostActions from './PostActions.vue'
import PostInfo from './PostInfo.vue'
import UpdatePostDialog from './UpdatePostDialog.vue'
import moment from 'moment'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import { postService } from '@/service/postService'
import { errorHandler } from '@/utils/errorHandler'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const userStore = useUserStore()
const props = defineProps(['post', 'type'])
const dialog = ref(false)
const formatedDate = computed(() => {
  return moment(props.post.created_at).fromNow()
})
const avatarChar = computed(() => {
  return props.post.user.name[0]
})

function deletePost() {
  postService.deletePost(props.post.id)
    .then((response) => {
      console.log(response.data)
      postStore.deletePost(props.post.id)
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function toggle() {
  dialog.value = !dialog.value
}
</script>