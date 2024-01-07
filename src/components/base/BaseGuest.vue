<template>
    <v-container fluid class="fill-height bounder d-flex flex-column">
        <header class="header">
            <slot name="header"></slot>
            <AlertBase :message="alertStore.messageState" :type="type" v-show="showAlert"/>
        </header>
        <main class="main">
            <slot name="main"></slot>
        </main>
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </v-container>
</template>
<script setup>
import AlertBase from '../notify/AlertBase.vue'
import { watchEffect,ref } from 'vue';
import {MessageType} from '../../utils/MessageType'
//TODO: use alert store here
import {useAlertStore} from '../../stores/alert'

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