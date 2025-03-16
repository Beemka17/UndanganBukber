import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Alpine from 'alpinejs'
import 'flowbite'
import vAnimate from './directives/v-animate'

window.Alpine = Alpine

Alpine.start()

const app = createApp(App)

app.directive('animate', vAnimate)

app.use(router)

app.mount('#app')
