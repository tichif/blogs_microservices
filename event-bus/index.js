const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  try {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event); //posts
    axios.post('http://comments-srv:4001/events', event); // comments
    axios.post('http://query-srv:4002/events', event); // query
    axios.post('http://moderation-srv:4003/events', event); // moderation

    res.send({ status: 'ok' });
  } catch (error) {
    console.log(error);
  }
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log('App is listening on port 4005'));
