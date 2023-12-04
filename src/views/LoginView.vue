<template>
    <BaseGuest>
        <template #main>
            <v-container class="fill-height" fluid>
                <v-row>
                    <v-col>
                        <v-card variant="text">
                            <v-img src="/public/images/logo.png" width="50%" height="50%" cover></v-img>
                            <v-card-title style="font-size: x-large;">Facebook giúp bạn kết nối và chia sẻ với mọi người
                                trong cuộc sống của bạn.</v-card-title>
                        </v-card>
                    </v-col>
                    <v-col>
                        <LoginForm></LoginForm>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </BaseGuest>
</template>

<script setup>
import LoginForm from '../components/login/LoginForm.vue'
import BaseGuest from '../components/base/BaseGuest.vue'
</script>

<style>
#app {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>