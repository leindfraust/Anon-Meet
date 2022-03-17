import {
    createStore
} from 'vuex'

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
    }
});