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
    

    socket.on('clientToServer', (data) => {
        console.log(data)
    })

    socket.on('switchButtonPressed', (roomNo) => {
        console.log("received switchButtonPressed for room "+ roomNo );
        io.to(roomNo).emit('switchFromServer');
    });
})