<template>
    <div class="columns">
        <div class="column is-2" style="background-color: #a01af3;">
            <aside class="menu">
                <ul class="menu-list">
                    <div class="container subtitle" style="padding: 5px">
                        <li>
                            <button class="dropdown-item button" @click="pickRoom(2021)" :disabled="OldRoomID == 2021">Opptemom Prime</button>
                        </li>
                        <li>
                            <button class="dropdown-item button" @click="pickRoom(2025)" :disabled="OldRoomID == 2025">Cocomelon</button>
                        </li>
                        <li>
                            <button class="dropdown-item button" @click="pickRoom(2030)" :disabled="OldRoomID == 2030">Flazymama</button>
                        </li>
                        <li>
                            <button class="dropdown-item button" @click="pickRoom(2050)" :disabled="OldRoomID == 2050">Red Horse</button>
                        </li>
                        <li>
                            <button class="dropdown-item button" @click="pickRoom(2075)" :disabled="OldRoomID == 2075">Only judge can god me</button>
                        </li>
                    </div>
                </ul>
            </aside>
        </div>
        <div class="column" v-if="!roomPicked"><h1 class="title has-text-centered" id="pickRoomDialogue" style="margin-top: 50vh">Pick a room to start chatting!</h1></div>
        <div class="column" v-if="roomPicked">
            <div class="box" id="chatbox" style="width: 100%; margin: auto; height: 94vh; overflow: auto;">
                <div class="container" v-for="(message, index) in messages" :key="index">
                    <div class="has-text-centered">
                        <span
                            v-if="message.hostMsg != null"
                            class="notification has-text-info"
                        ><b>{{ message.hostMsg }}</b></span>
                    </div>
                    
                    <div v-if="message.message != null" class="content" >
                        <h3 ><img :src="message.userpic">
                            <b>{{ message.user }}: {{ message.message }}</b><br/>
                        </h3>
                    </div>
                </div>
            </div>
            <div class="field has-addons" >
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
                        :disabled="input == ''"
                        @click="sendMessage(this.input)"
                    >Send</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import socket from '../socket'

export default {
    name: 'LibakChat',
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
            setTimeout(()=> {this.scrollBottom()}, 100)
        });
        socket.on('host message', (hostMsg, roomNo) => {
            this.messages.push({
                hostMsg: hostMsg
            });
            this.OldRoomID = roomNo
        });
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
            OldRoomID: ''
        }
    },
    methods: {
        disconnect() {
            socket.disconnect();
        },
        pickRoom(room) {
            socket.emit('join room', room, `${this.currentUser} has joined the room.`)
            this.messages = []
            this.roomPicked = true
            if(this.OldRoomID) {
                socket.emit('leave room', this.OldRoomID, `${this.currentUser} has left the room.`)
            }
        },
        sendMessage(msg) {
            let userpic = this.imgPreUrl + this.currentUser + this.extUrl
            socket.emit('message', msg, this.currentUser, userpic)
            this.input = ''
        },
        scrollBottom(){
            let el = document.getElementById('chatbox')
            el.lastElementChild.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    }
}
</script>

<style scoped>
img {
    width: 5%;
}
@media (max-width: 991.98px){
    img {
        width: 15%
    }
    #pickRoomDialogue {
        margin-top: 0px !important
    }
    #chatbox {
        height: 65vh !important
    }
}
</style>