<template>
  <v-app-bar order="-1">
    <template #prepend>
      <v-container grid-list-xs class="d-flex flex-row justify-center" style="width: 400px;">
        <HomeButton></HomeButton>
        <SearchBox></SearchBox>
      </v-container>
    </template>
    <template #append>
      <v-container grid-list-xs class="d-flex flex-row justify-end" style="width: 400px;">
        <NotifyList></NotifyList>
        <v-btn class="ma-2" variant="tonal" icon="mdi-menu" size="large" :elevation="12"></v-btn>
        <v-btn class="ma-2" variant="tonal" icon="mdi-facebook-messenger" size="large" :elevation="12"></v-btn>
        <AvatarMenu></AvatarMenu>
      </v-container>
    </template>
    <template #default>
      <NavigationBar></NavigationBar>
    </template>
  </v-app-bar>
</template>

<script setup>
import SearchBox from './SearchBox.vue'
import HomeButton from './HomeButton.vue'
import NavigationBar from './NavigationBar.vue'
import AvatarMenu from './AvatarMenu.vue'
import pusher from '../../../notifications/pusher'
import { notificationHandler } from '@/handler/notificationHandler'
import { useUserStore } from '@/stores/user'
import NotifyList from '@/components/home/appbar/NotifyList.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const messageStore = useMessageStore()
const toast = useToast()

await userStore.getUser()
subscribe()

function subscribe() {
  pusher.unsubscribe(`private-App.Models.User.${userStore.user.id}`)
  const channelNotify = pusher.subscribe(`private-App.Models.User.${userStore.user.id}`)
  channelNotify.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', function(data) {
    notificationHandler(data)
  })

  pusher.unsubscribe(`private-Chat.User.${userStore.user?.id}`)
  const channelChat = pusher.subscribe(`private-Chat.User.${userStore.user?.id}`)
  channelChat.bind('App\\Events\\MessageCreated', function(data) {
    const fromUserId = data.message.from_user.id
    if (route.name == 'chat' && fromUserId == route.params.id) {
      messageStore.push(data.message)
    } else {
      messageStore.newUserMessage(data.message)
      toast.info('New message', {
        onClick: () => {
          router.push({ name: 'chat', params: { id: fromUserId } })
        }
      })
    }
  })

  pusher.unsubscribe(`private-Chat.Group.User.${userStore.user?.id}`)
  const channeGroupChat = pusher.subscribe(`private-Chat.Group.User.${userStore.user?.id}`)
  channeGroupChat.bind('App\\Events\\GroupChatMessageCreated', function(data) {
    const groupChatId = data.groupChatMessage.group_chat.id
    if (route.name == 'chat-group' && groupChatId == route.params.id) {
      messageStore.push(data.groupChatMessage)
    } else {
      toast.info('New group message', {
        onClick: () => {
          router.push({ name: 'chat-group', params: { id: groupChatId } })
        }
      })
    }
  })
  console.log(pusher.channels)
}

</script>