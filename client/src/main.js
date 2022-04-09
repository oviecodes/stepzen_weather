import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(BootstrapIconsPlugin)
app.use(router)

app.mount('#app')
