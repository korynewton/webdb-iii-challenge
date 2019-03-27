const express = require('express');

const router = express.Router();

//const knexConfig = require('../knexConfig')
// const db = knex(knexConfig);

router.use(express.json());

router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "route is hooked up" })
    } catch {
        res.status(500).json({ message: "route failed" })
    }
})

module.exports = router;