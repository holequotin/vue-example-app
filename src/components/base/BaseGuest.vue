<template>
    <v-container fluid class="fill-height bounder d-flex flex-column">
        <header class="header">
            <slot name="header"></slot>
            <AlertBase message="This is first message" type="success"/>
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