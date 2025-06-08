const express = require('express');
const bodyParse = require('body-parser');
const { sequelize, Item } = require('./database');

const app = express();
app.use(bodyParse.json());

sequelize.sync();

let items =[
    {id: 1, name: 'item 1' },
    {id: 2, name: 'item 2' },
];

// Create
app.post('/items', async (req, res) => {
    try {
        const newItem = await Item.create({ name: req.body.name });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read
app.get('/items', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
app.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        item.name = req.body.name;
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
app.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        await item.destroy();
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));