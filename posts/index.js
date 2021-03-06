const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res, next) => {
  res.send(posts);
});

app.post('/posts', async (req, res, next) => {
  try {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
      id,
      title,
    };

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: { id, title },
    });

    res.status(201).send(posts[id]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/events', async (req, res) => {
  console.log('received event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('V55');
  console.log('App is listening on port 4000');
});
