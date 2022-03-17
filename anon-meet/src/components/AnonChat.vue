<template>
    <div class="columns">
        <div class="column is-2">
            <nav class="navbar">
                <div class="navbar-brand">
                    <router-link to="/" class="navbar-item">
                        <img :src="require('../assets/logo.png')" />
                    </router-link>
                    <a
                        role="button"
                        class="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        @click="toggleMenu"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
            </nav>
            <aside class="menu box" id="menu-nav" :class="{ 'is-hidden-mobile': menuMobileToggle }">
                <ul class="menu-list container">
                    <p class="subtitle is-6 has-text-success">Users Online: {{ connectedUsers }}</p>
                    <p class="menu-label">Meet Ups</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSocialEvent }"
                            @click="pickRoom('SocialEvent')"
                            :disabled="OldRoomID == 'SocialEvent'"
                        >
                            <i class="fa-solid fa-people-pulling"></i>&nbsp; Social Events
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedOrgEvents }"
                            @click="pickRoom('OrgEvents')"
                            :disabled="OldRoomID == 'OrgEvents'"
                        >
                            <i class="fa-solid fa-people-group"></i>&nbsp; Organizational Events
                        </a>
                    </li>
                    <p class="menu-label">Interests</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedDating }"
                            @click="pickRoom('Dating')"
                            :disabled="OldRoomID == 'Dating'"
                        >
                            <i class="fa-solid fa-heart-pulse"></i>&nbsp; Dating
                        </a>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedMAM }"
                            @click="pickRoom('MAM')"
                            :disabled="OldRoomID == 'MAM'"
                        >
                            <i class="fa-solid fa-book-open-reader"></i>&nbsp; Manga, Anime & Manwha
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSMP }"
                            @click="pickRoom('SMP')"
                            :disabled="OldRoomID == 'SMP'"
                        >
                            <i class="fa-solid fa-flask"></i>&nbsp; Science, Math & Programming
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSE }"
                            @click="pickRoom('SE')"
                            :disabled="OldRoomID == 'SE'"
                        >
                            <i class="fa-solid fa-school-flag"></i>&nbsp; School and Education
                        </a>
                    </li>
                    <p class="menu-label">News</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedI }"
                            @click="pickRoom('I')"
                            :disabled="OldRoomID == 'I'"
                        >
                            <i class="fa-solid fa-globe"></i>&nbsp; International
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedN }"
                            @click="pickRoom('N')"
                            :disabled="OldRoomID == 'N'"
                        >
                            <i class="fa-solid fa-building-flag"></i>&nbsp; National
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedL }"
                            @click="pickRoom('L')"
                            :disabled="OldRoomID == 'L'"
                        >
                            <i class="fa-solid fa-street-view"></i>&nbsp; Local
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
        <div class="column" v-if="!roomPicked">
            <h1
                class="title has-text-centered"
                id="pickRoomDialogue"
                style="margin-top: 50vh"
            >Pick a room to start chatting!</h1>
            <aside
                class="menu box is-hidden-desktop"
                :class="{ 'is-hidden-mobile': !menuMobileToggle }"
            >
                <ul class="menu-list container">
                    <p class="subtitle is-6 has-text-success">Users Online: {{ connectedUsers }}</p>
                    <p class="menu-label">Meet Ups</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSocialEvent }"
                            @click="pickRoom('SocialEvent')"
                            :disabled="OldRoomID == 'SocialEvent'"
                        >
                            <i class="fa-solid fa-people-pulling"></i>&nbsp; Social Events
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedOrgEvents }"
                            @click="pickRoom('OrgEvents')"
                            :disabled="OldRoomID == 'OrgEvents'"
                        >
                            <i class="fa-solid fa-people-group"></i>&nbsp; Organizational Events
                        </a>
                    </li>
                    <p class="menu-label">Interests</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedDating }"
                            @click="pickRoom('Dating')"
                            :disabled="OldRoomID == 'Dating'"
                        >
                            <i class="fa-solid fa-heart-pulse"></i>&nbsp; Dating
                        </a>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedMAM }"
                            @click="pickRoom('MAM')"
                            :disabled="OldRoomID == 'MAM'"
                        >
                            <i class="fa-solid fa-book-open-reader"></i>&nbsp; Manga, Anime & Manwha
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSMP }"
                            @click="pickRoom('SMP')"
                            :disabled="OldRoomID == 'SMP'"
                        >
                            <i class="fa-solid fa-flask"></i>&nbsp; Science, Math & Programming
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSE }"
                            @click="pickRoom('SE')"
                            :disabled="OldRoomID == 'SE'"
                        >
                            <i class="fa-solid fa-school-flag"></i>&nbsp; School and Education
                        </a>
                    </li>
                    <p class="menu-label">News</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedI }"
                            @click="pickRoom('I')"
                            :disabled="OldRoomID == 'I'"
                        >
                            <i class="fa-solid fa-globe"></i>&nbsp; International
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedN }"
                            @click="pickRoom('N')"
                            :disabled="OldRoomID == 'N'"
                        >
                            <i class="fa-solid fa-building-flag"></i>&nbsp; National
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedL }"
                            @click="pickRoom('L')"
                            :disabled="OldRoomID == 'L'"
                        >
                            <i class="fa-solid fa-street-view"></i>&nbsp; Local
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
        <div class="column" v-if="roomPicked">
            <div class="has-text-centered box">
                <h4 class="title is-4">Room: {{ selectedRoom }}</h4>
            </div>
            <div
                class="container is-fluid"
                id="chatbox"
                style="width: 100%; margin: auto; height: 82vh; overflow: auto;"
            >
                <div class="container" v-for="(message, index) in messages" :key="index">
                    <div class="has-text-centered">
                        <span v-if="message.hostMsg != null" class="box notification is-info">
                            <b>{{ message.hostMsg }}</b>
                        </span>
                    </div>
                    <div v-if="message.message != null" class="content">
                        <h3>
                            <img class="socials" v-bind:src="message.userpic" />
                            <b>{{ message.user }}: {{ message.message }}</b>
                            <br />
                        </h3>
                    </div>
                </div>
            </div>
            <div class="field has-addons" id="send-control">
                <p class="control" style="width: 100%;">
                    <input
                        type="input"
                        class="input"
                        v-model="input"
                        placeholder="Type something..."
                        @keyup.enter="sendMessage($event, input)"
                    />
                </p>
                <p class="control">
                    <button
                        class="button is-info"
                        type="button"
                        @click="sendMessage($event, input)"
                    >Send</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import socket from '../socket'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
    socket.connect()
    socket.on('chat message', (msg, user, userpic) => {
        messages.value.push({
            user: user,
            message: msg,
            userpic: userpic
        });
        setTimeout(() => { scrollBottom() }, 100)
    });
    socket.on('host message', (hostMsg, roomNo) => {
        messages.value.push({
            hostMsg: hostMsg
        });
        OldRoomID.value = roomNo
    });
    socket.on('users-connected', users => {
        connectedUsers.value = users
    });
});
onBeforeUnmount(() => {
    socket.disconnect()
});

let messages = ref([])
let currentUser = ref(store.state.username)
let input = ref('')
const imgPreUrl = ref('https://avatars.dicebear.com/api/micah/')
const extUrl = ref('.svg')
let roomPicked = ref(false)
let roomPickedSocialEvent = ref(false)
let roomPickedOrgEvents = ref(false)
let roomPickedDating = ref(false)
let roomPickedMAM = ref(false)
let roomPickedSMP = ref(false)
let roomPickedSE = ref(false)
let roomPickedI = ref(false)
let roomPickedN = ref(false)
let roomPickedL = ref(false)
let OldRoomID = ref('')
let selectedRoom = ref('')
let menuMobileToggle = ref(true)
let connectedUsers = ref(0)

function pickRoom(room) {
    socket.emit('join room', room, `${currentUser.value} has joined the room.`)
    messages.value = []
    menuMobileToggle.value = true
    roomPicked.value = true
    if (room == 'SocialEvent') {
        roomPickedSocialEvent.value = true,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false
        selectedRoom.value = 'Social Events'
    } else if (room == 'OrgEvents') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = true,
            roomPickedDating.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false,
            selectedRoom.value = 'Organizational Events'
    } else if (room == 'MAM') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = false,
            roomPickedMAM.value = true,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false
        selectedRoom.value = 'Manga, Anime & Manwha'
    } else if (room == 'Dating') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = true,
            roomPickedMAM.value = false
        roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false
        selectedRoom.value = 'Dating'
    } else if (room == 'SMP') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = true,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false
        selectedRoom.value = 'Science, Math & Programming'
    } else if (room == 'SE') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = true,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false,
            selectedRoom.value = 'School and Education'
    } else if (room == 'I') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = true,
            roomPickedN.value = false,
            roomPickedL.value = false,
            selectedRoom.value = 'International News'
    } else if (room == 'N') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = true,
            roomPickedL.value = false,
            selectedRoom.value = 'National News'
    } else if (room == 'L') {
        roomPickedSocialEvent.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedDating.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = true
        selectedRoom.value = 'Local News'
    }


    if (OldRoomID.value) {
        socket.emit('leave room', OldRoomID.value, `${currentUser.value} has left the room.`)
    }
}
function sendMessage(e, msg) {
    let userpic = imgPreUrl.value + currentUser.value + extUrl.value
    if (input.value == '') {
        e.preventDefault()
    } else {
        socket.emit('message', msg, currentUser.value, userpic)
        input.value = ''
    }
}
function scrollBottom() {
    let el = document.getElementById('chatbox')
    el.lastElementChild.scrollIntoView({ behavior: "smooth" });
}
function toggleMenu() {
    menuMobileToggle.value = !menuMobileToggle.value
}
</script>
<style scoped>
#send-control {
    position: fixed;
    bottom: 0;
    width: 82vw;
}
#menu-nav {
    width: 17vw;
}
.socials {
    width: 5%;
}
@media (max-width: 991.98px) {
    #send-control {
        position: fixed;
        bottom: 0;
        width: 100vw;
    }
    .socials {
        width: 15%;
    }
    #pickRoomDialogue {
        margin-top: 0px !important;
    }
    #chatbox {
        height: 70vh !important;
    }
    #menu-nav {
        width: 100%;
    }
}
.dropdown-item {
    cursor: pointer;
}
</style>