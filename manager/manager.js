'use strict';
require('dotenv').config()

const { faker } = require('@faker-js/faker');
let ID = faker.datatype.uuid();
const ioclient = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/`;

const mainConnection = ioclient.connect(host);
const airLineConnection = ioclient.connect(`${host}airline`);

airLineConnection.on('new-flight', (payload) => {
    setTimeout(() => {
        console.log(`Manager : we’re greatly thankful for the amazing flight, ${payload.Details.pilot} `);
    }, 7000);
});



setInterval(() => {
    let flight =
    {
        events: "new-flight",
        time: new Date().toLocaleString(),
        Details: {
            airLine: 'Royal Jordanian Airlines',
            flightID: ID,
            pilot: faker.name.findName(),
            destination: faker.address.cityName()
        },
    }


    console.log(`Manager: new flight with ID ${flight.Details.flightID} have been scheduled`)
    mainConnection.emit("new-flight", flight)
}, 10000)
