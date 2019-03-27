const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const studentsRoutes = require('./routes/studentsRoutes')
const cohortsRoutes = require('./routes/cohortsRoutes')

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3',
    },
    useNullAsDefault: true, 
  };

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

server.use('/api/cohorts', cohortsRoutes)
server.use('/api/students', studentsRoutes)

module.exports = server;