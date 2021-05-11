const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(posts);

  res.send({});
});

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.listen(4002, console.log(`App is listening on port 4002`));
