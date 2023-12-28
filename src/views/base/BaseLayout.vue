<template>
    <AppBar></AppBar>
    <v-layout class="rounded rounded-md">
        <AlertBase :message="message" :type="type" v-show="showAlert" />
        <slot name="appbar">
            <v-app-bar title="This is slot app bar">

            </v-app-bar>
        </slot>
        <slot name="left-drawer">
            <v-navigation-drawer location="left" width="360">
                <v-list>
                    <v-list-item title="Drawer left"></v-list-item>
                </v-list>
            </v-navigation-drawer>
        </slot>

        <slot name="right-drawer">
            <v-navigation-drawer location="right" width="360">
                <v-list>
                    <v-list-item title="Drawer right"></v-list-item>
                </v-list>
            </v-navigation-drawer>
        </slot>
        <slot name="main">
            <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
                Main Content
            </v-main>
        </slot>
    </v-layout>
</template>

<script setup>
import AlertBase from '../../components/notify/AlertBase.vue';
import { useAlertStore } from '../../stores/alert';
import { ref, watchEffect } from 'vue'
import { MessageType } from '../../utils/MessageType';
const alertStore = useAlertStore()
const message = ref('default message')
const type = ref(MessageType.INFO)
const showAlert = ref(false)
watchEffect(() => {
    message.value = alertStore.messageState
    type.value = alertStore.typeState
    if (message.value != '') {
        showAlert.value = true
        setTimeout(() => {
            showAlert.value = false
        }, 2000)
    }
})
</script>
<style scoped>
.bounder {
    min-height: 100vh;
    font-weight: normal;
}

.header {
    min-height: 10vh;
}

.footer {
    min-height: 10vh;
}

.main {
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>