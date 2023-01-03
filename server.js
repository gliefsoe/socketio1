const express = require('express')
const app = express()
const port = 3000
const server = app.listen(port)
const io = require('socket.io')(server)

app.use(express.static(__dirname));

app.get('/', (req, res )=>{
    res.send("Hey .. socket")
})

let playerReg = {}
let clientNo = 0;
let roomNo;

io.on('connection', (socket) =>{
    console.log('a user connected: ' + socket.id)

    clientNo++;
    roomNo =  Math.round(clientNo/2);
    // join a room with a unique room num
    socket.join( roomNo );

    if (clientNo % 2 === 1){
        //creating player 1
        playerReg[socket.id] = {id: socket.id, roomNo: roomNo, no: 1};
    } else if (clientNo % 2 === 0){
        //creating player 2
        playerReg[socket.id] = {id: socket.id, roomNo: roomNo, no: 2};
    }

    for (let id in playerReg ){
        io.to(playerReg[id].roomNo).emit('serverToClient', playerReg[id]);
        
    }

    //socket.emit( 'serverToClient', data );
    //console.log('user is in room ' + data.room)
    console.log( JSON.stringify(playerReg));


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

    socket.on('disconnect', (reason) => {
        console.log("disconncted: reason: "+ reason );
        
    });

})

