import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router';
import {store} from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../node_modules/bulma/css/bulma.min.css'
import '../node_modules/animate.css/animate.min.css'

createApp(App)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app')