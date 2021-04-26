import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='newComment'>New Comment</label>
          <input
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary mt-3'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
