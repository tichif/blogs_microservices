const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/events', (req, res) => {});

app.get('/posts', (req, res) => {});

app.listen(4002, console.log(`App is listening on port 4002`));
