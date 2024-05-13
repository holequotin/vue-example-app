import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'
import VueToastificationPlugin, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//icon fonts
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
const options = {
  position: POSITION.TOP_RIGHT
}
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
            fa
        }
    },
    components,
    directives,
})
app.use(createPinia())
app.use(VueToastificationPlugin, options)
app.use(router)
app.use(vuetify)

app.mount('#app')