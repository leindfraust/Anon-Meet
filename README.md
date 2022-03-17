# Anon Meet
No database, chat web application made with Socket.io and Vue 3.
 
# Get Started
Fork project and go to directory folder
```
cd anon-meet
```

Install packages in server-side(root directory) and client-side(anon-meet)

server-side: 
```
npm install
```

client-side:
go to anon-meet folder
```
cd anon-meet
```
and install packages
```
npm install
```

# Serve in your browser
Edit socket.js in client-side folder(anon-meet) and uncomment ``` let URL = 'http://localhost:5000' ```. It will be like this: 
```import {
    io
} from "socket.io-client"
const socket = io({
let URL = 'http://localhost:5000'
const socket = io(URL,{
    autoConnect: false
});
```
go back to root directory ``` cd ../ ``` and serve on your browser by ``` npm run dev ```

