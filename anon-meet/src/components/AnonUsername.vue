nc<template>
    <section class="hero is-fullheight" style=" margin: auto; background-color: whitesmoke">
        <div class="hero-body" style="width: 33%; margin: auto;">
            <div class="container has-text-centered box">
                <h1 class="title is-1"><span class="has-text-success">An</span>on Meet</h1>
                <div class="block"></div>
                <p class="subtitle is-5">Chat anyone, <b>anonymously</b>.</p>
                <div class="field">
                    <div class="control">
                        <input
                            class="input"
                            type="input"
                            v-model="username"
                            placeholder="Username"
                        />
                    </div>
                    <br />
                    <button
                        class="button is-success"
                        type="button"
                        :disabled="username == ''"
                        @click="anonChat"
                    >Get Started</button>
                </div>
            </div>
        </div>
    </section>
    <AnonFooterVue/>
</template>

<script>
import AnonFooterVue from "./AnonFooter.vue"
export default {
    name: 'AnonUsername',
    components: {
        AnonFooterVue
    },
    data() {
        return {
            username: ''
        }
    },
    methods: {
        async anonChat() {
            this.$store.commit("username", this.username)
            await this.$router.push('/chatnow')
        }
    }
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