<template>
    <BaseLayout>
        <template #appbar>
            <AppBar></AppBar>
        </template>
        <template #main>
            <v-main style="min-height: 300px">
                <v-card class="d-flex justify-center" max-height="500px">
                    <v-container grid-list-xs fluid class="d-flex justify-start align-center flex-column">
                        <v-img min-width="70%" max-height="70%" aspect-ratio="16/9" cover height="500px"
                            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                        <v-container class="d-flex justify-space-around" style="width: 90%;">
                            <div class="d-flex justify-start">
                                <v-btn outline color="primary" dark v-if="currUserId == userStore.user.id"
                                    @click="editAvatar = true">Edit avatar</v-btn>
                                <EditAvatarDialiog v-if="editAvatar" @toggle="editAvatar = !editAvatar" @after="changed" :dialog="editAvatar">
                                </EditAvatarDialiog>
                                <v-avatar color="surface-variant" size="150" style="margin-top : -100px;">
                                    <v-img v-if="user.avatar" :src="user.avatar" cover></v-img>
                                    <span v-else class="text-h5">{{ avatarChar }}</span>
                                </v-avatar>
                                <h1 style="margin-left: 20px;">{{ user.name }}</h1>
                            </div>
                            <div class="d-flex justiy-start">
                                <FriendButton :friendship="friendship" v-if="userStore.user.id != currUserId"
                                    @send="sendRequest" @unfriend="unfriend" @cancel="cancel" @accept="accept"
                                    @refuse="refuse"></FriendButton>
                                <v-btn outline color="primary" dark v-else @click="edit = true">Edit profile</v-btn>
                                <ProfileDialog :dialog="edit" @toggle="edit = !edit" @after="getUser"></ProfileDialog>
                            </div>
                        </v-container>
                        <v-divider></v-divider>
                        <v-container grid-list-xs style="width: 70%;"
                            class="d-flex flex-row justify-start align-center">
                            <RouterLink :to="{ name: 'profile-parent', params: { id: $route.params.id } }"><v-btn
                                    color="primary" variant="plain">Posts</v-btn></RouterLink>
                            <RouterLink :to="{ name: 'profile-friend', params: { id: $route.params.id } }"><v-btn
                                    color="primary" variant="plain">Friends</v-btn></RouterLink>

                        </v-container>
                    </v-container>
                </v-card>
                <slot name="content" :friends="friends">
                    <v-container grid-list-xs style="width: 70%;" class="d-flex flex-row">
                        <v-row>
                            <v-col cols="5">
                                <v-card>
                                    <v-card-title>
                                        Friends
                                    </v-card-title>
                                    <v-card-item>
                                        <v-row>
                                            <v-col cols="4" v-for="friend in friends" :key="friend.id"
                                                style="height: fit-content;">
                                                <v-img cover :height="150" aspect-ratio="1/1"
                                                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                                                    class="rounded-lg"></v-img>
                                                <RouterLink :to="`${friend.id}`"><span style="color: white;">{{
                                    friend.name }}</span></RouterLink>
                                            </v-col>
                                        </v-row>
                                    </v-card-item>
                                </v-card>
                            </v-col>
                            <v-col cols="7">
                                <NewPostCard width="100%" v-if="userStore.user?.id == user?.id"></NewPostCard>
                                <PostCard v-for="post in postStore.posts" type="feed" :post="post" :key="post.id"
                                    @delete="postStore.getPostsByUser(user.id)">
                                </PostCard>
                                <v-container grid-list-xs>
                                    <v-row class="d-flex justify-space-between">
                                        <v-btn outline color="primary" dark
                                            @click="postStore.previousPage(postStore.getPostsByUser, currUserId)">Previous</v-btn>
                                        <span>Current Page: {{ postStore.currentPage }}</span>
                                        <v-btn outline color="primary" dark
                                            @click="postStore.nextPage(postStore.getPostsByUser, currUserId)">Next</v-btn>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </slot>
            </v-main>
        </template>
        <template #left-drawer>
            <div>

            </div>
        </template>
        <template #right-drawer>
            <div></div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '../base/BaseLayout.vue';
import AppBar from '../../components/home/appbar/AppBar.vue';
import FriendButton from '../../components/profile/FriendButton.vue';
import NewPostCard from '../../components/home/feed/NewPostCard.vue';
import PostCard from '../../components/home/feed/PostCard.vue';
import { computed, provide, ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
import { userService } from '../../service/userService'
import { friendService } from '../../service/friendService'
import { useUserStore } from '../../stores/user';
import { useAlertStore } from '../../stores/alert';
import { usePostStore } from '../../stores/post';
import { errorHandler } from '../../utils/errorHandler';
import { MessageType } from '../../utils/MessageType';
import ProfileDialog from '../../components/profile/ProfileDialog.vue';
import EditAvatarDialiog from '../../components/profile/EditAvatarDialiog.vue'

const route = useRoute();
const currUserId = ref(1);
const test = ref('Hello');
const friends = ref([]);
const postStore = usePostStore()
const userStore = useUserStore();
const friendship = ref(null)
const user = ref({})
const edit = ref(false)
const editAvatar = ref(false)
const alertStore = useAlertStore()
provide('friends', friends)
provide('test', test)
watchEffect(() => {
    currUserId.value = route.params.id;
    //TODO: Use promie all
    userStore.getUser()
    postStore.getPostsByUser(currUserId.value)
    getUser()
    getFriends()
    getFriendship()
})

const avatarChar = computed(() => {
    if(!user?.value?.name) return "A"
    return user.value.name[0].toUpperCase()
})

function getFriends() {
    friendService.getFriendsByUser(currUserId.value)
        .then((response) => {
            friends.value = response.data
        })
        .catch((error) => {
            errorHandler(error);
        })
}

function getUser() {
    userService.getUserById(currUserId.value)
        .then((response) => {
            user.value = response.data
        })
        .catch((error) => {
            errorHandler(error);
        })
}

function getFriendship() {
    friendService.getFriendship(currUserId.value)
        .then((response) => {
            console.log(response.data)
            friendship.value = response.data
        })
        .catch((error) => {
            friendship.value = null
            console.log(error)
        })
}

function unfriend() {
    friendService.unfriend(currUserId.value)
        .then((response) => {
            console.log(response.data)
            alertStore.showAlert('Unfriend successfully', MessageType.SUCCESS)
            getFriendship()
        })
        .catch((error) => {
            errorHandler(error)
        })
}

function sendRequest() {
    friendService.sendRequest(currUserId.value)
        .then((response) => {
            console.log(response.data)
            alertStore.showAlert('Send friend request successfully', MessageType.SUCCESS)
            getFriendship()
        })
        .catch((error) => {
            errorHandler(error)
        })
}

function accept() {
    friendService.accept(friendship.value.id)
        .then((response) => {
            console.log(response.data)
            alertStore.showAlert('Accepted', MessageType.SUCCESS)
            getFriendship()
        })
        .catch((error) => {
            errorHandler(error)
        })
}

function cancel() {
    friendService.unfriend(currUserId.value)
        .then((response) => {
            console.log(response.data)
            alertStore.showAlert('Cancel', MessageType.SUCCESS)
            getFriendship()
        })
        .catch((error) => {
            errorHandler(error)
        })
}

function refuse() {
    friendService.unfriend(currUserId.value)
        .then((response) => {
            console.log(response.data)
            alertStore.showAlert('Refuse', MessageType.SUCCESS)
            getFriendship()
        })
        .catch((error) => {
            errorHandler(error)
        })
}

function changed() {
    postStore.getPostsByUser(currUserId.value); 
    getUser()
    userStore.getUser()
}
</script>
