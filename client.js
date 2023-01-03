const socket = io('http://localhost:3000')

var logger = document.getElementById('logger');
var btnRoom = document.getElementById('Room');
var btnChat = document.getElementById('Chat');
var btnSwitch = document.getElementById('Switch');

btnRoom.addEventListener('click', () => {
    // create an html table
    console.log("Room request");
    
    socket.emit('clientToServer', "new room")
})

btnChat.addEventListener('click', () => {
    console.log("Chat request");
    socket.emit('clientToClients', "hello to the fellow clients!")
})

btnSwitch.addEventListener('click', () => {
    console.log('request server to switch the roomlight')
    socket.emit('switchButtonPressed', clientRoom);
    // already switch it
})

var clientRoom;

socket.on('connect', () => {
    console.log("connected with socketid: " + socket.id);
});
socket.on('serverToClient', (data) => {
    logger.innerHTML += 'we are in room ' + JSON.stringify(data)

    clientRoom = data;
})

socket.on('switchFromServer', ()=>{
    console.log('client received switchFromServer event');
    console.log(JSON.stringify(document.body.style.background) );
    if ( document.body.style.background == "darkgray") {
        document.body.style.background = "white";
    }
    else {
        document.body.style.background = "darkgray";
    }
});

socket.emit('clientToServer', "(client) Hello Server! ")


