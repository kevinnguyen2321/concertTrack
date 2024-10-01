export const getCommentByConcertIdAndExpandUser = (concertId) => {
  return fetch(
    `http://localhost:8088/comments?concertId=${concertId}&_expand=user`
  ).then((res) => res.json());
};

export const getAllComments = () => {
  return fetch('http://localhost:8088/comments').then((res) => res.json());
};
