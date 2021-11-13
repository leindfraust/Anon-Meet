<template>
    <section class="hero is-fullheight" style=" margin: auto; background-color: #a01af3;">
        <div class="hero-body">
            <div class="container has-text-centered">
                <span class="title has-text-white">LIBAK</span><img :src="require('../assets/logo.png')" id="libak-logo">
                <br/>
                <br/>
                <p class="subtitle has-text-white">Chat anyone anonymously. </p>
                <div class="field" style="width: 33%; margin: auto;">
                    <label class="label has-text-white has-text-left">Username:</label>
                    <div class="control">
                        <input class="input" type="input" v-model="username" placeholder="username required"/>
                    </div>
                    <br/>
                    <button
                        class="button is-success"
                        type="button"
                        :disabled="username == ''"
                        @click="libakChat"
                    >Get Started</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'LibakUsername',
    data() {
        return {
            username: ''
        }
    },
    methods: {
        async libakChat() {
            this.$store.commit("username", this.username)
            await this.$router.push('/chatnow')
        }
    }
}
</script>

<style scoped>
#libak-logo {
    width: 7%
}
@media (max-width: 991.98px){
    .field {
        width: 100% !important
    }
    #libak-logo {
    width: 15%
}
}
</style>