<template>
    <div class="columns">
        <div class="column is-2">
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="toggleMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            <aside class="menu box" :class="{'is-hidden-mobile': menuMobileToggle}">
                <ul class="menu-list container">
                <p class="subtitle is-6 has-text-success">Users Online: {{connectedUsers}}</p>
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
            <h4 class="title is-4">{{selectedRoom}}</h4>
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
                        @click="sendMessage($event, this.input)"
                    >Send</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import socket from '../socket'

export default {
    name: 'AnonChat',
    created() {
        document.addEventListener('beforeunload', this.disconnect)
    },
    mounted() {
        socket.connect()
        socket.on('chat message', (msg, user, userpic) => {
            this.messages.push({
                user: user,
                message: msg,
                userpic: userpic
            });
            setTimeout(() => { this.scrollBottom() }, 100)
        });
        socket.on('host message', (hostMsg, roomNo) => {
            this.messages.push({
                hostMsg: hostMsg
            });
            this.OldRoomID = roomNo
        });
        socket.on('users-connected', users => {
            this.connectedUsers = users
        })
    },
    data() {
        return {
            messages: [],
            hostMessage: [],
            currentUser: this.$store.state.username,
            input: '',
            imgPreUrl: 'https://avatars.dicebear.com/api/micah/',
            extUrl: '.svg',
            roomPicked: false,
            roomPickedFiesta: false,
            roomPickedOrgEvents: false,
            roomPickedMAM: false,
            roomPickedSMP: false,
            roomPickedSE: false,
            roomPickedI: false,
            roomPickedN: false,
            roomPickedL: false,
            OldRoomID: '',
            selectedRoom: '',
            menuMobileToggle: true,
            connectedUsers: 0
        }
    },
    methods: {
        disconnect() {
            socket.disconnect();
        },
        pickRoom(room) {
            socket.emit('join room', room, `${this.currentUser} has joined the room.`)
            this.messages = []
            this.menuMobileToggle = true
            this.roomPicked = true
            if (room == 'Fiesta') {
                this.roomPickedFiesta = true,
                    this.roomPickedOrgEvents = false,
                    this.roomPickedMAM = false,
                    this.roomPickedSMP = false,
                    this.roomPickedSE = false,
                    this.roomPickedI = false,
                    this.roomPickedN = false,
                    this.roomPickedL = false
                    this.selectedRoom = 'Fiestas'
            } else if (room == 'OrgEvents') {
                this.roomPickedFiesta = false,
                    this.roomPickedOrgEvents = true,
                    this.roomPickedMAM = false,
                    this.roomPickedSMP = false,
                    this.roomPickedSE = false,
                    this.roomPickedI = false,
                    this.roomPickedN = false,
                    this.roomPickedL = false,
                    this.selectedRoom = 'Organizational Events'
            } else if (room == 'MAM') {
                this.roomPickedFiesta = false,
                    this.roomPickedOrgEvents = false,
                    this.roomPickedMAM = true,
                    this.roomPickedSMP = false,
                    this.roomPickedSE = false,
                    this.roomPickedI = false,
                    this.roomPickedN = false,
                    this.roomPickedL = false
                    this.selectedRoom = 'Manga, Anime & Manwha'
            } else if (room == 'SMP') {
                this.roomPickedFiesta = false,
                    this.roomPickedOrgEvents = false,
                    this.roomPickedMAM = false,
                    this.roomPickedSMP = true,
                    this.roomPickedSE = false,
                    this.roomPickedI = false,
                    this.roomPickedN = false,
                    this.roomPickedL = false
                    this.selectedRoom = 'Science, Math & Programming'
            } else if (room == 'SE') {
                this.roomPickedFiesta = false,
                    this.roomPickedOrgEvents = false,
                    this.roomPickedMAM = false,
                    this.roomPickedSMP = false,
                    this.roomPickedSE = true,
                    this.roomPickedI = false,
                    this.roomPickedN = false,
                    this.roomPickedL = false,
                    this.selectedRoom = 'School and Education'
            } else if (room == 'I') {
                this.roomPickedFiesta = false,
                    this.roomPickedOrgEvents = false,
                    this.roomPickedMAM = false,
                    this.roomPickedSMP = false,
                    this.roomPickedSE = false,
                    this.roomPickedI = true,
                    this.roomPickedN = false,
                    this.roomPickedL = false,
                    this.selectedRoom = 'International News'
            } else if (room == 'N') {
                this.roomPickedFiesta = false,
                    this.roomPickedOrgEvents = false,
                    this.roomPickedMAM = false,
                    this.roomPickedSMP = false,
                    this.roomPickedSE = false,
                    this.roomPickedI = false,
                    this.roomPickedN = true,
                    this.roomPickedL = false,
                    this.selectedRoom = 'National News'
            } else if (room == 'L') {
                this.roomPickedFiesta = false,
                    this.roomPickedOrgEvents = false,
                    this.roomPickedMAM = false,
                    this.roomPickedSMP = false,
                    this.roomPickedSE = false,
                    this.roomPickedI = false,
                    this.roomPickedN = false,
                    this.roomPickedL = true
                    this.selectedRoom = 'Local News'
            }


            if (this.OldRoomID) {
                socket.emit('leave room', this.OldRoomID, `${this.currentUser} has left the room.`)
            }
        },
        sendMessage(e, msg) {
            let userpic = this.imgPreUrl + this.currentUser + this.extUrl
            if (this.input == '') {
                e.preventDefault()
            } else {
                socket.emit('message', msg, this.currentUser, userpic)
                this.input = ''
            }
        },
        scrollBottom() {
            let el = document.getElementById('chatbox')
            el.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        },
        toggleMenu() {
            this.menuMobileToggle = !this.menuMobileToggle
        }
    }
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