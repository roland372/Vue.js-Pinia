import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import './assets/main.css';

// enable pinia store inside our app
createApp(App).use(createPinia()).mount('#app');
