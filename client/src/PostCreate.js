import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await axios.post(
      'http://localhost:4000/posts',
      { title },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
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

export default PostCreate;
