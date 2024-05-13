<template>
  <v-card class="mx-auto mb-5" light width="100%">
    <template v-slot:prepend>
      <div class="d-flex justify-start">
        <v-avatar color="blue-darken-2" size="large">
          <v-img v-if="checkURL(post.user.avatar)" alt="John" :src="post.user.avatar"></v-img>
          <span v-else class="text-h5">{{ avatarChar }}</span>
        </v-avatar>
        <div class="ml-3">
          <RouterLink :to="{ name: 'profile-parent', params: { id: post.user.id } }" style="color: white;">
            <div class="d-flex align-items-center">
              <v-card-title class="d-inline">{{ post.user.name }}</v-card-title>
              <div class="ml-5 mt-1" v-if="props.post.shared_post">Shared the post</div>
              <span class="d-inline ml-5 w-75" v-if="post.group">posted in <RouterLink
                :to="{name:'group-view', params: {slug : post.group.slug}}"><v-card-title
                style="display: inline; width: 50%"
                class="ml-5">{{ post.group.name }}</v-card-title></RouterLink></span>
            </div>
          </RouterLink>
          <v-card-subtitle>
            {{ props.post.created_at ? formatedDate : null }}
          </v-card-subtitle>
        </div>
      </div>
    </template>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item v-if="post.permissions.update" @click="dialog = true">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="post.permissions.delete" @click="deletePost">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <UpdatePostDialog :dialog="dialog" :post="post" @edited="$emit('edited')" @toggle="toggle">
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
      <PostCard v-if="props.post.shared_post" :post="props.post.shared_post" type="aa" style="width: 97%"></PostCard>
      <v-alert
        v-if="post.shared_post == null && post.shared_post_id != null"
        type="error"
        variant="outlined"
      >
        This content isn't available at the moment
      </v-alert>
    </slot>
    <!--reaction infomation-->
    <slot name="actions">
      <div v-if="type === 'feed'">
        <PostInfo :post="post"></PostInfo>
        <v-divider></v-divider>
        <v-container grid-list-xs fluid>
          <PostActions :post="post">
          </PostActions>
        </v-container>
      </div>
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
import { checkURL } from '@/utils/fileUtils'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const toast = useToast()
const props = defineProps(['post', 'type'])
const emits = defineEmits(['deleted', 'edited'])
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
      toast.success(response.data.message)
      emits('deleted')
    })
    .catch((error) => {
      errorHandler(error)
    })
}

function toggle() {
  dialog.value = !dialog.value
}
</script>