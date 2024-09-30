export const addNewConcert = (newPostObj) => {
  return fetch(' http://localhost:8088/concerts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPostObj),
  });
};
