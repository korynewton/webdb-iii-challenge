const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "working" })
    } catch {
        res.status(500).json({ message: "failed" })
    }
})

module.exports = server;