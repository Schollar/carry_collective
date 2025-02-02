import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify'; // Import Vuetify

// Create the app
const app = createApp(App);

// Use plugins
app.use(store).use(router).use(vuetify);

// Mount the app
app.mount('#app');