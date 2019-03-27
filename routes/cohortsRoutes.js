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
        const cohorts = await db('cohorts')
        res.status(200).json(cohorts)
    } catch {
        res.status(500).json({ message: "route failed" })
    }

// router.get('/:id', async (req, res) => {
//     const { id } = req.params
//     try {
//         // const cohort = await db('cohorts')
//         // .where({ id }).first()
//         res.status(200).json(cohort)
//     } catch {
//         res.status(500).json({ message: "error retrieving cohort"})
//     }
// })
})

module.exports = router;