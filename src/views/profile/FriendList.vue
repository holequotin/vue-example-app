<template>
    <v-container grid-list-xs style="width: 70%;">
        <v-card>
            <v-card-title>
                Friends
            </v-card-title>
            <v-card-item>
                <v-row>
                    <v-col cols="6" v-for="friend in friends" :key="friend.id" class="d-flex justify-start">
                        <div style="width: 120px; height: 120px;">
                            <v-img :width="150" aspect-ratio="1/1" cover
                                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                                style="width: 120px; height: 120px;"></v-img>
                        </div>
                        <div style="margin-left: 20px;">
                            <RouterLink :to="`/profile/${friend.id}`"><span style="font-size: larger;" class="color-link">{{ friend.name }}</span></RouterLink>
                        </div>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </v-container>
</template>
<script setup>
import { inject } from 'vue';
import { RouterLink } from 'vue-router';
const friends = inject('friends')
</script>
<style scoped>
 .color-link {
    color: white;
 }
</style>