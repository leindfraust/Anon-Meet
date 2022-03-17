import {
    createStore
} from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export const store = createStore({
    state() {
        return {
            username: null
        }
    },
    mutations: {
        username(state, username) {
            state.username = username
        }
    },
    plugins: [vuexLocal.plugin]
});