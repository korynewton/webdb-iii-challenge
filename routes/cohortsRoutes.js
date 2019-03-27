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
})

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const cohort = await db('cohorts').where({ id }).first()
            res.status(200).json(cohort)
        } catch {
            res.status(500).json({ error: "error" })
        }
    })

    router.post('/', async (req, res) => {
        try {
            const [id] = await db('cohorts').insert(req.body)
            const posted = await db('cohorts').where({ id }).first()
            res.status(200).json(posted)
        } catch {
            res.status(500).json({ error: "error in adding to database" })
        }
    })

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const edited = await db('cohorts').where({ id }).update(req.body);
            res.status(200).json(edited)
        } catch {
            res.status(500).json({ error: "error in editing "})
        }
    })

    router.get('/:id/students', async (req, res) => {
        try {
            const  cohortStudents = await db('students').where({ cohort_id : req.params.id })
            res.status(200).json(cohortStudents)
        } catch {
            res.status(500).json({ error: "error in retrieving students"})
        }
    })


module.exports = router;