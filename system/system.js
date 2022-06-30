'use strict';

require('dotenv').config()
const PORT = process.env.PORT || 3030;
const uuid = require('uuid').v4;//13

const ioServer = require('socket.io')(PORT);

//namespace
const airline = ioServer.of('/airline');

//13
const queue = {
    flights: {

    }
};

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

    //// lab 13
    socket.on("get-all", (flight) => {
        Object.keys(queue.flights).forEach((id) => {
            socket.emit("new-flight", {
                ID: id,
                Flight: queue.flights[id]
            });
        });
    });

    //////  13
    socket.on("delete", (flight) => {
        delete queue.flights[flight.id];
    });

});





ioServer.on('connection', (socket) => {
    console.log('connected ', socket.id);

    socket.on("new-flight", (flight) => {
        console.log(flight);
        console.log('_________________________________________');
        const id = uuid();//this will create for me a unique id//13
        queue.flights[id] = flight;//13
        airline.emit('new-flight', flight)
    });

});



