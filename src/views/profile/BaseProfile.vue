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
                                <v-avatar color="surface-variant" size="150" style="margin-top : -100px;">
                                    <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg" cover></v-img>
                                </v-avatar>
                                <h1 style="margin-left: 20px;">{{ user?.name }}</h1>
                            </div>
                            <div class="d-flex justiy-start">

                            </div>
                        </v-container>
                        <v-divider></v-divider>
                        <v-container grid-list-xs style="width: 70%;" class="d-flex flex-row justify-start align-center">
                            <RouterLink :to="{name: 'profile-parent', params : {id : $route.params.id}}"><v-btn color="primary" variant="plain">Posts</v-btn></RouterLink>
                            <RouterLink :to="{name: 'profile-friend', params : {id : $route.params.id}}"><v-btn color="primary" variant="plain">Friends</v-btn></RouterLink>
                            
                        </v-container>
                    </v-container>
                </v-card>
                <slot name="content" :friends = "friends">
                    <v-container grid-list-xs style="width: 70%;" class="d-flex flex-row">
                        <v-row>
                            <v-col cols="5">
                                <v-card>
                                    <v-card-title>
                                        Friends
                                    </v-card-title>
                                    <v-card-item>
                                        <v-row>
                                            <v-col cols="4" v-for="friend in friends" :key="friend.id" style="height: fit-content;">
                                                <v-img cover :height="150" aspect-ratio="1/1"
                                                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                                                    class="rounded-lg"></v-img>
                                                <RouterLink :to="`${friend.id}`"><span style="color: white;">{{ friend.name }}</span></RouterLink>
                                            </v-col>
                                        </v-row>
                                    </v-card-item>
                                </v-card>
                            </v-col>
                            <v-col cols="7">
                                <NewPostCard width="100%" v-if="userStore.user?.id == user?.id"></NewPostCard>
                                <PostCard v-for="post in postStore.profilePosts" type="feed" :post="post" :key="post.id"></PostCard>
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
import NewPostCard from '../../components/home/feed/NewPostCard.vue';
import PostCard from '../../components/home/feed/PostCard.vue';
import { provide, ref, watchEffect } from 'vue'
import { RouterLink,useRoute } from 'vue-router';
import {userService} from '../../service/userService'
import {friendService} from '../../service/friendService'
import {usePostStore} from '../../stores/post'
import { useUserStore } from '../../stores/user';
import { errorHandler } from '../../utils/errorHandler';
const route = useRoute();
const user = ref({});
const test = ref('Hello');
const friends = ref([]);
const postStore = usePostStore();
const userStore = useUserStore();
provide('friends', friends)
provide('test', test)
watchEffect(() => {
    const userId = route.params.id;
    //TODO: Use promie all
    postStore.getAllPost()
    userStore.getUser()
    userService.getUserById(userId)
        .then((response) => {
            user.value = response.data
        })
        .catch((error) => {
            errorHandler(error);
        })  
    friendService.getFriendsByUserId(userId)
        .then((response) => {
            friends.value = response.data
        })
        .catch((error) => {
            errorHandler(error);
        })
})
</script>
