const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
  try {
    const event = req.body;

    axios.post('http://localhost:4000/events', event); //posts
    axios.post('http://localhost:4001/events', event); // comments
    axios.post('http://localhost:4002/events', event); // query
    axios.post('http://localhost:4003/events', event); // moderation

    res.send({ status: 'ok' });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4005, () => console.log('App is listening on port 4005'));
