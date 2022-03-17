<template>
    <section class="hero is-fullheight" style=" margin: auto; background-color: whitesmoke">
        <div class="hero-body" style="width: 33%; margin: auto;">
            <div class="container has-text-centered box">
                <h1 class="title is-1">
                    <span class="has-text-success">An</span>on Meet
                </h1>
                <div class="block"></div>
                <p class="subtitle is-5">
                    Chat anyone,
                    <b>anonymously</b>.
                </p>
                <div class="field">
                    <div class="control">
                        <input class="input" type="input" v-model="username" placeholder="Username" />
                    </div>
                    <br />
                    <button
                        class="button is-success"
                        type="button"
                        :disabled="username == ''"
                        @click="anonChat"
                    >Get Started</button>
                </div>
                <p class="subtitle is-7 has-text-left">
                    Developed by
                    <b>Ronan</b>. | |
                    <a href="www.facebook.com/leindfraust">Facebook</a>
                    <a href="https://github.com/leindfraust">Github</a>
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter} from 'vue-router'

const store = useStore()
const router = useRouter()
let username = ref('')
async function anonChat() {
    store.commit('username', username.value)
    router.push('/chatnow')
}
</script>

<style scoped>
#anon-logo {
    width: 100%;
}
@media (max-width: 991.98px) {
    .hero-body {
        width: 100% !important;
    }
}
</style>