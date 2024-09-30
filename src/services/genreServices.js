export const getAllGenres = () => {
  return fetch(' http://localhost:8088/genres').then((res) => res.json());
};
