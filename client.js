const socket = io('http://localhost:3000')

var logger = document.getElementById('logger');
var btnRoom = document.getElementById('Room');
var btnHello = document.getElementById('Hello');
var btnSwitch = document.getElementById('Switch');

btnRoom.addEventListener('click', () => {
    // create an html table
    console.log("Room request");
})

var clientRoom;
socket.on('serverToClient', (data) => {
    logger.innerHTML += 'we are in room' + JSON.stringify(data)

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

socket.emit('clientToServer', "Hello Server! ")

btnHello.addEventListener('click', () => {
    socket.emit('clientToClients', "hello to the fellow clients!")

})

btnSwitch.addEventListener('click', () => {
    console.log('request server to swith the room')
    socket.emit('switchButtonPressed', clientRoom);
    // already switch it

})
