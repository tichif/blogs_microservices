const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

const handleEvents = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, status, postId } = data;
    const post = posts[postId];

    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvents(type, data);

  res.send({});
});

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.listen(4002, async () => {
  try {
    console.log(`App is listening on port 4002`);

    const { data } = await axios.get('http://event-bus-srv:4005/events');

    for (let event of data) {
      console.log('Processing event:' + event.type);
      handleEvents(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
