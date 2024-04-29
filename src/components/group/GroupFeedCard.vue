<script setup>

import { checkURL } from '@/utils/fileUtils'
import PostInfo from '@/components/home/feed/PostInfo.vue'
import PostActions from '@/components/home/feed/PostActions.vue'
import UpdatePostDialog from '@/components/home/feed/UpdatePostDialog.vue'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import { postService } from '@/service/postService'
import { useAlertStore } from '@/stores/alert'
import { MessageType } from '@/utils/MessageType'
import { errorHandler } from '@/utils/errorHandler'


const alertStore = useAlertStore()
const props = defineProps(['post'])
const emits = defineEmits(['deleted'])
const userStore = useUserStore()
const dialog = ref(false)
const groupType = computed(() => {
  if (props.post.group.type === '1') return 'Public'
  return 'Private'
})

function toggle() {
  dialog.value = !dialog.value
}

function deletePost() {
  postService.deletePost(props.post.id)
    .then(response => {
      alertStore.showAlert('Delete post successfully', MessageType.SUCCESS)
      emits('deleted')
    })
    .catch(error => {
      errorHandler(error)
    })
}
</script>

<template>
  <v-card class="mx-auto mb-5" width="100%">
    <template v-slot:prepend>
      <div class="d-flex justify-start">
        <v-avatar color="blue-darken-2" rounded="0" size="large">
          <v-img v-if="checkURL(post.group.url)" :src="post.group.url" alt="John"></v-img>
          <span v-else class="text-h5">{{ post.group.name[0] }}</span>
        </v-avatar>
        <div class="ml-3">
          <RouterLink :to="{ name: 'group-view', params: { slug: post.group.slug } }" style="color: white;">
            <div class="d-flex align-items-center">
              <v-card-title class="d-inline">{{ post.group.name }}</v-card-title>
              <v-chip class="ml-3">
                {{ groupType }}
              </v-chip>
            </div>
          </RouterLink>
          <RouterLink :to="{name: 'profile-parent', params: { id: post.user.id } }">
            <v-card-subtitle class="text-subtitle-1">
              <v-avatar color="blue" size="20">
                <v-img v-if="checkURL(post.user.avatar)" :src="post.user.avatar" alt="John"></v-img>
                <span v-else class="text-h5">{{ post.user.name[0] }}</span>
              </v-avatar>
              {{ props.post.user.name }}
            </v-card-subtitle>
          </RouterLink>
        </div>
      </div>
    </template>
    <template v-slot:append>
      <v-menu v-if="userStore.user.id === props.post.user.id || userStore.user.id === props.post.group?.owner.id">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-horizontal" v-bind="props" variant="plain"></v-btn>
        </template>

        <v-list>
          <v-list-item v-if="userStore.user.id === props.post.user.id" @click="dialog = true">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deletePost">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <UpdatePostDialog :dialog="dialog" :post="props.post" @edited="$emit('edited')" @toggle="toggle">
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
          <v-img v-for="image in props.post.images" v-bind:key="image.id" :src="image.url" aspect-ratio="16/9"
                 cover width="100%"></v-img>
        </v-col>
      </v-row>
    </slot>
    <!--reaction infomation-->
    <slot name="actions">
      <div>
        <PostInfo :post="props.post"></PostInfo>
        <v-divider></v-divider>
        <v-container fluid grid-list-xs>
          <PostActions :post="props.post">
          </PostActions>
        </v-container>
      </div>
    </slot>
  </v-card>
</template>

<style scoped>

</style>