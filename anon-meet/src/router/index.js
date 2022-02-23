import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
import AnonUsername from '../components/AnonUsername.vue'
import AnonChat from '../components/AnonChat.vue'

const routes = [{
    path: '/',
    name: AnonUsername,
    component: AnonUsername
},
{
    path: '/chatnow',
    name: AnonChat,
    component: AnonChat,
    meta: {
        requireUsername: true
    }
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireUsername)) {
        if (store.state.username) {
            return next();
        } else {
            return next('/');
        }
    }
    next();
}); 

export default router