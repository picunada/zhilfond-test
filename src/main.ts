import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { key, store } from './stores/user'

createApp(App).use(store, key).mount('#app')
