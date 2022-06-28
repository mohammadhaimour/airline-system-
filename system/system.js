
'use strict';

require('dotenv').config()
const PORT = process.env.PORT || 3030;

const ioServer = require('socket.io')(PORT);

//namespace
const airline = ioServer.of('/airline');



airline.on('connection', (socket) => {
    console.log('connect to airline system ', socket.id);

    socket.on('took-off', (flight) => {
        console.log(flight);
        console.log('____________________________');

    });

    socket.on('arrived', (flight) => {
        console.log(flight);
        console.log('_________________________________');

    });

});


ioServer.on('connection', (socket) => {
    console.log('connected ', socket.id);

    socket.on("new-flight", (flight) => {
        console.log(flight);
        console.log('_________________________________________');
        airline.emit('new-flight', flight)
    });

});


