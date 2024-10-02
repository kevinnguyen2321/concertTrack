export const getCommentByConcertIdAndExpandUser = (concertId) => {
  return fetch(
    `http://localhost:8088/comments?concertId=${concertId}&_expand=user`
  ).then((res) => res.json());
};

export const getAllComments = () => {
  return fetch('http://localhost:8088/comments').then((res) => res.json());
};

export const addNewComment = (commentObj) => {
  return fetch(`http://localhost:8088/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  });
};

export const deleteComment = (commentId) => {
  return fetch(`http://localhost:8088/comments/${commentId}`, {
    method: 'DELETE',
  });
};
