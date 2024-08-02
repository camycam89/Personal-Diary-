const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Get all diary entries
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM diary_entries ORDER BY date DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get a specific diary entry
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM diary_entries WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Diary entry not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a new diary entry
router.post('/', async (req, res) => {
    const { date, text, category } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO diary_entries (date, text, category) VALUES ($1, $2, $3) RETURNING *',
            [date, text, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update a diary entry
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { text, category } = req.body;
    try {
        const result = await pool.query(
            'UPDATE diary_entries SET text = $1, category = $2 WHERE id = $3 RETURNING *',
            [text, category, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Diary entry not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a diary entry
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM diary_entries WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Diary entry not found');
        }
        res.send('Diary entry deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
