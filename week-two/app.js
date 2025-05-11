const express = require('express');
const bodyParse = require('body-parser');
const app = express();

app.use(bodyParse.json());


let items =[
    {id: 1, name: 'item 1' },
    {id: 2, name: 'item 2' },
];

// Create
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);


});

// Read
app.get('/items', (req, res) => {
    res.json(items);
})

// Update

app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const  UpdatedItem =req.body;

    items = items.map(item =>  (item.id === itemId ? UpdatedItem : item) )

    res.json(UpdatedItem);
});

// Delete

app.delete('items/:id', (req, res) => {
   const itemId = parseInt(req.params.id);
   items = items.filter(item => item.id !== itemId );

   res.sendStatus(204);
});



const PORT = 8080;


app.listen(
    PORT,
    () => console.log(`it Alive on port https://localhost:${PORT}`)

)