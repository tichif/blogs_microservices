import React from 'react';

const CommentList = ({ comments }) => {
  let renderedComments;
  if (comments) {
    renderedComments = comments.map((comment) => (
      <li key={comment.id}>{comment.content}</li>
    ));
  }

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
