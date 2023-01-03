const express = require('express')
const app = express()
const port = 3000
const server = app.listen(port)
const io = require('socket.io')(server)

app.use(express.static(__dirname));

app.get('/', (req, res )=>{
    res.send("Hey .. socket")
})

let clientNo = 0;

io.on('connection', (socket) =>{
    console.log('a user connected')

    clientNo++;
    roomNo =  Math.round(clientNo/2);
    // join a room with a unique room num
    socket.join( roomNo );
    socket.emit( 'serverToClient', roomNo );
    console.log('user is in room ' + roomNo)


    socket.on('clientToServer', (data) => {
        console.log( JSON.stringify(data));
        if ( data == "new room" ) {
            // leave current room, and join a new one
            clientNo++;
            roomNo =  Math.round(clientNo/2);
            socket.join( roomNo );
            socket.emit( 'serverToClient', roomNo );
        }
    })
    socket.on('clientToClients', (data) => {
        console.log( JSON.stringify(data));
        io.to(roomNo).emit('serverToClient', data);
    })
    

    socket.on('switchButtonPressed', (roomNo) => {
        console.log("received switchButtonPressed for room "+ roomNo );
        io.to(roomNo).emit('switchFromServer');
    });
})