import React from 'react';

const CommentList = ({ comments }) => {
  let renderedComments;
  let content;
  if (comments) {
    renderedComments = comments.map((comment) => {
      if (comment.status === 'approved') {
        content = comment.content;
      } else if (comment.status === 'pending') {
        content = 'This comment is awaiting moderation';
      } else if (comment.status === 'reject') {
        content = 'This comment has been rejected.';
      }
      return <li key={comment.id}>{content}</li>;
    });
  }

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
