"use strict";
require("dotenv").config();

const ioclient = require('socket.io-client');

let host = `http://localhost:${process.env.PORT}/airline`;

const mainConnection = ioclient.connect(host);
//13
const uuid = require('uuid').v4;
const id = uuid();
mainConnection.emit("get-all");

mainConnection.on("new-flight", (flight) => {

    setTimeout(() => {
        flight.events = "took_off";
        console.log(`Pilot: flight with ID ${flight.Details.flightID} took-off`);
        mainConnection.emit('took-off', flight);
    }, 4000);
});

mainConnection.on("new-flight", (flight) => {

    setTimeout(() => {
        flight.events = "arrived";
        console.log(`Pilot: flight with ID ${flight.Details.flightID} has arrived`);
        mainConnection.emit('arrived', flight)
    }, 7000);
});

////////////////  13
mainConnection.on("new-flight", (flight) => {
    console.log("pilot messege queue")

    console.log(`Pilot:Sorry i didn't catch this flight ID ${id}`);
    mainConnection.emit("delete", flight)
});
