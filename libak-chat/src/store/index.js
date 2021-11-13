import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        username: null
    },
    mutations: {
        username(state, username) {
            state.username = username
        }
    },
});

export default store