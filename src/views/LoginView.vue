<template>
    <BaseGuest>
        <template #main>
            <v-container class="fill-height" fluid>
                <v-row>
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