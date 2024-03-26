import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/movies';

export const getAllMovies = () => axios.get(BASE_REST_API_URL);

export const saveMovie = (movie) => axios.post(BASE_REST_API_URL, movie);

export const getMovie = (id) => axios.get(`${BASE_REST_API_URL}/${id}`);

export const updateMovie = (id, movie) => axios.post(`${BASE_REST_API_URL}/${id}`, movie);

export const deleteMovie = (id) => axios.delete(`${BASE_REST_API_URL}/${id}`);

export const takeSeat = (id) => axios.patch(`${BASE_REST_API_URL}/${id}/taken`);