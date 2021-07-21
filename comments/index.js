const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  try {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
      id: commentId,
      content,
      status: 'pending',
    });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: 'pending',
      },
    });

    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
  }
});

app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
      const { postId, content, id, status } = data;
      const comments = commentsByPostId[postId];

      const comment = comments.find((comment) => comment.id === id);
      comment.status = status;

      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: {
          id,
          postId,
          content,
          status,
        },
      });
    }
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(4001, () => console.log('App is listening on port 4001'));
