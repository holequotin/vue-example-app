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
        </v-card>
    </v-container>
</template>
<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { checkURL } from '@/utils/fileUtils'

const friends = inject('friends')
</script>
<style scoped>
 .color-link {
    color: white;
 }
</style>