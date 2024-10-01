export const addNewConcert = (newPostObj) => {
  return fetch(' http://localhost:8088/concerts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPostObj),
  });
};

export const getConcertByUserIdAndExpandUser = (userId) => {
  return fetch(
    `http://localhost:8088/concerts?userId=${userId}&_expand=user`
  ).then((res) => res.json());
};

export const deleteConcert = (concertId) => {
  return fetch(`http://localhost:8088/concerts/${concertId}`, {
    method: 'DELETE',
  });
};
