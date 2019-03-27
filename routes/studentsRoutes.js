const express = require('express');
const knex = require('knex')
const router = express.Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3',
    },
    useNullAsDefault: true, 
  };

const db = knex(knexConfig)

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const students = await db('students')
        res.status(200).json(students)
    } catch {
        res.status(500).json({ message: "route failed" })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await db('students').where({ id }).first()
        res.status(200).json(student)
    } catch {
        res.status(500).json({ error: "error" })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const edited = await db('students').where({ id }).update(req.body);
        res.status(200).json(edited)
    } catch {
        res.status(500).json({ error: "error in editing "})
    }
})

module.exports = router;