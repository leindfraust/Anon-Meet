import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
import LibakUsername from '../components/LibakUsername.vue'
import LibakChat from '../components/LibakChat.vue'

const routes = [{
    path: '/',
    name: LibakUsername,
    component: LibakUsername
},
{
    path: '/chatnow',
    name: LibakChat,
    component: LibakChat,
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