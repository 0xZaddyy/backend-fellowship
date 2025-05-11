const express = require('express');
const bodyParse = require('body-parser');
const app = express();

app.use(bodyParse.json());

const PORT = 8080;


app.listen(
    PORT,
    () => console.log(`it Alive on port https://localhost:${PORT}`)

)