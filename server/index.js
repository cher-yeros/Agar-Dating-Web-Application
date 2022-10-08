const express = require("express");
const cors = require("cors");

const socketio = require("socket.io");
const http = require("http");

require("./utils/socket");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors());

const auth = require("./routes/auth");
const user = require("./routes/user.js");
const chat = require("./routes/chat.js");
const match = require("./routes/match.js");
const post = require("./routes/post.js");
const request = require("./routes/request.js");

app.use("/api", auth);
app.use("/api/user", user);
app.use("/api/chat", chat);
app.use("/api/match", match);
app.use("/api/request", request);
app.use("/api/post", post);

//const server = http.createServer(app);
//const io = socketio(server);

//io.on('connection', (socket) => {
//    console.log(socket.id, " is connected");
//    socket.on('openChat', (user) => {

//        user.socketId = socket.id
//        //addUser(user.username, socket.id)
//        //console.log(user);
//        //console.log(user);
//        addUsersArray(user);
//        io.emit('userAdded', usersArray);
//    });

//    socket.on('sendMessage', (msg) => {
//        console.log(usersArray);
//        const socketId = findSocketId(msg.receiver_id)
//        console.log(socketId, socket.id)
//        //const socketId = users[msg.username];
//        //console.log(socketId);
//        //console.log('Messag Sent to '+ socketId, msg);
//        //io.to(socketId).emit("messageSent", {
//        //    msg: msg.text
//        //});
//    })

//    socket.on('disconnect', () => {
//        console.log("user disconnected!");
//    })
//});

const port = 5000;

const ip = "localhost";

app.listen(port);

console.log(`Server is listening to ${ip} on port ${port}`);
