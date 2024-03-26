import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/cinema-room';

export function getAllCinemaRooms() {
    return axios.get(BASE_REST_API_URL);
}

export function getCinemaRoom(id) {
    return axios.get(`${BASE_REST_API_URL}/${id}`);
}

export function updateSeat(cinemaRoomId, seatData) {
    return axios.post(`${BASE_REST_API_URL}/${cinemaRoomId}`, seatData);
}

export function markSeatsAsTaken(cinemaRoomId, seatIds) {
    return axios.patch(`${BASE_REST_API_URL}/${cinemaRoomId}/seats`, seatIds);
}

export function getFreeSeatCount(cinemaRoomId) {
    return axios.get(`${BASE_REST_API_URL}/${cinemaRoomId}/seats/count`);
}