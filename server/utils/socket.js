const { User } = require('../models/schema');

const socketio = require('socket.io');
const io = socketio(8000, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = []

function storeSocket(userId, socketId) {
    let found = false;
    users.forEach(user => {
        if (user.userId == userId) {
            found = true;
        }
    })
    if (!found) {
        users.push({ userId, socketId })
    }

    User.update({
        socketId: socketId,
    }, {
        where: {
            id: userId,
        },
    }).then((result) => {});
    
}

function findSocketId(userId) {

    let sId;
    users.forEach(user => {
        if (userId == user.userId) {
            console.log(user);
            sId = user.socketId
        }
    });

    return sId;
}

io.on('connection', (socket) => {
    socket.on('openChat', (user) => {
        storeSocket(user.id, socket.id)
        io.emit('userAdded', users);
    }); 

    socket.on('sendMessage', (msg) => {
        const socketId = findSocketId(msg.receiver_id);
        console.log('Messag Sent to ' + socketId);
        
        if (socket != null) {
            io.to(socketId).emit("messageSent", {
                msg: msg
            });
        }
        else {
            console.log("Socket ID is NULL!");
        }
        
    })

    socket.on('user_disconnected', (userId) => {
        console.log(userId, " Disconnected");

        //User.update({
        //    socketId: null,
        //}, {
        //    where: {
        //        id: userId,
        //    },
        //}).then((result) => {});
    })

    socket.on('disconnect', () => {
        console.log(socket.id, "user disconnected!");
        User.update({
            socketId: null,
        }, {
            where: {
                socketId: socket.id,
            },
        }).then((result) => {
            //socket.broadcast('leavesocket', {user: "user"})
        });
    })
});