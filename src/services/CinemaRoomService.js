import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/cinema-room';

export const getAllCinemaRooms = () => axios.get(BASE_REST_API_URL);

export const getCinemaRoom = (id) => axios.get(`${BASE_REST_API_URL}/${id}`);

export const updateSeat = (cinemaRoomId, seatData) => axios.post(`${BASE_REST_API_URL}/${cinemaRoomId}`, seatData);

export const markSeatsAsTaken = (cinemaRoomId, seatIds) => axios.patch(`${BASE_REST_API_URL}/${cinemaRoomId}/seats`, seatIds);

export const getFreeSeatCount = (cinemaRoomId) => axios.get(`${BASE_REST_API_URL}/${cinemaRoomId}/seats/count`);