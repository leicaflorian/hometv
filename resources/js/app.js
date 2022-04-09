
require('@popperjs/core')
require('bootstrap/js/dist/dropdown')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './components/App.vue'

const pinia = createPinia()
const app = createApp(App)

app.config.devtools = true
app.use(pinia)

app.mount('#app')
