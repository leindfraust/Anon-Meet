<template>
    <div class="columns">
        <div class="column is-2">
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
            <aside class="menu box" :class="{ 'is-hidden-mobile': menuMobileToggle }">
                <ul class="menu-list container">
                    <p class="subtitle is-6 has-text-success">Users Online: {{ connectedUsers }}</p>
                    <p class="menu-label">Meet Ups</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedFiesta }"
                            @click="pickRoom('Fiesta')"
                            :disabled="OldRoomID == 'Fiesta'"
                        >Fiestas</a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedOrgEvents }"
                            @click="pickRoom('OrgEvents')"
                            :disabled="OldRoomID == 'OrgEvents'"
                        >Organizational Events</a>
                    </li>
                    <p class="menu-label">Interests</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedMAM }"
                            @click="pickRoom('MAM')"
                            :disabled="OldRoomID == 'MAM'"
                        >Manga, Anime & Manwha</a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSMP }"
                            @click="pickRoom('SMP')"
                            :disabled="OldRoomID == 'SMP'"
                        >Science, Math & Programming</a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedSE }"
                            @click="pickRoom('SE')"
                            :disabled="OldRoomID == 'SE'"
                        >School and Education</a>
                    </li>
                    <p class="menu-label">News</p>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedI }"
                            @click="pickRoom('I')"
                            :disabled="OldRoomID == 'I'"
                        >International</a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedN }"
                            @click="pickRoom('N')"
                            :disabled="OldRoomID == 'N'"
                        >National</a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            :class="{ 'is-active': roomPickedL }"
                            @click="pickRoom('L')"
                            :disabled="OldRoomID == 'L'"
                        >Local</a>
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
        </div>
        <div class="column" v-if="roomPicked">
            <div class="box">
                <h4 class="title is-4">{{ selectedRoom }}</h4>
            </div>
            <div
                class="container is-fluid"
                id="chatbox"
                style="width: 100%; margin: auto; height: 82vh; overflow: auto;"
            >
                <div class="container" v-for="(message, index) in messages" :key="index">
                    <div class="has-text-centered">
                        <span v-if="message.hostMsg != null" class="box notification has-text-info">
                            <b>{{ message.hostMsg }}</b>
                        </span>
                    </div>
                    <div v-if="message.message != null" class="content">
                        <h3>
                            <img v-bind:src="message.userpic" />
                            <b>{{ message.user }}: {{ message.message }}</b>
                            <br />
                        </h3>
                    </div>
                </div>
            </div>
            <div class="field has-addons">
                <p class="control" style="width: 100%;">
                    <input
                        type="input"
                        class="input"
                        v-model="input"
                        placeholder="Type something..."
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
let roomPickedFiesta = ref(false)
let roomPickedOrgEvents = ref(false)
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
    if (room == 'Fiesta') {
        roomPickedFiesta.value = true,
            roomPickedOrgEvents.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false
        selectedRoom.value = 'Fiestas'
    } else if (room == 'OrgEvents') {
        roomPickedFiesta.value = false,
            roomPickedOrgEvents.value = true,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false,
            selectedRoom = 'Organizational Events'
    } else if (room == 'MAM') {
        roomPickedFiesta.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedMAM.value = true,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false
        selectedRoom.value = 'Manga, Anime & Manwha'
    } else if (room == 'SMP') {
        roomPickedFiesta.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = true,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false
        selectedRoom.value = 'Science, Math & Programming'
    } else if (room == 'SE') {
        roomPickedFiesta.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = true,
            roomPickedI.value = false,
            roomPickedN.value = false,
            roomPickedL.value = false,
            selectedRoom = 'School and Education'
    } else if (room == 'I') {
        roomPickedFiesta.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = true,
            roomPickedN.value = false,
            roomPickedL.value = false,
            selectedRoom.value = 'International News'
    } else if (room == 'N') {
        roomPickedFiesta.value = false,
            roomPickedOrgEvents.value = false,
            roomPickedMAM.value = false,
            roomPickedSMP.value = false,
            roomPickedSE.value = false,
            roomPickedI.value = false,
            roomPickedN.value = true,
            roomPickedL.value = false,
            selectedRoom.value = 'National News'
    } else if (room == 'L') {
        roomPickedFiesta.value = false,
            roomPickedOrgEvents.value = false,
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
    el.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}
function toggleMenu() {
    menuMobileToggle.value = !menuMobileToggle.value
}
</script>
<style scoped>
img {
    width: 5%;
}
@media (max-width: 991.98px) {
    img {
        width: 15%;
    }
    #pickRoomDialogue {
        margin-top: 0px !important;
    }
    #chatbox {
        height: 69vh !important;
    }
}
.dropdown-item {
    cursor: pointer;
}
</style>