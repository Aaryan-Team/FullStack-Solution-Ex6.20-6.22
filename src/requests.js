import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAnec = () => axios.get(baseURL).then((res) => res.data);

export const createAnec = (newAnec) =>
  axios.post(baseURL, newAnec).then((res) => res.data);

export const updateAnec = (updatedAnec) =>
  axios
    .put(`${baseURL}/${updatedAnec.id}`, updatedAnec)
    .then((res) => res.data);
