import React, { useEffect, useState } from 'react';
import { getCinemaRoom, markSeatsAsTaken } from '../services/CinemaRoomService';

const CinemaRoomComponent = () => {
    const [cinemaRoomId, setCinemaRoomId] = useState(null);
    const [cinemaRoom, setCinemaRoom] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const id = window.location.pathname.split("/").pop();
        setCinemaRoomId(id);
        loadCinemaRoom(id);
    }, [refresh]);

    const loadCinemaRoom = (id) => {
        getCinemaRoom(id)
            .then((response) => {
                setCinemaRoom(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prevSelectedSeats) => {
            const updatedSelectedSeats = [...prevSelectedSeats];
            const index = updatedSelectedSeats.indexOf(seatId);
            if (index === -1) {
                updatedSelectedSeats.push(seatId);
            } else {
                updatedSelectedSeats.splice(index, 1);
            }
            return updatedSelectedSeats;
        });
    };

    const handleMarkSeatsAsTaken = () => {
        markSeatsAsTaken(cinemaRoomId, selectedSeats)
            .then(() => {
                console.log("Seats marked as taken successfully");
                setSelectedSeats([]);
                setRefresh(prevRefresh => !prevRefresh);
            })
            .catch((error) => {
                console.error("Error marking seats as taken:", error);
            });
    };

    if (!cinemaRoom) {
        return <div>Loading...</div>;
    }

    // Sort seats based on their IDs
    const sortedSeats = [...cinemaRoom.seats].sort((a, b) => a.id - b.id);

    return (
        <div>
            <h2>{cinemaRoom.title}</h2>

            <div className="seat-map">
                {sortedSeats.map((seat) => (
                    <button
                        key={seat.id}
                        className={`seat ${seat.taken ? "taken" : ""} ${
                            selectedSeats.includes(seat.id) ? "selected" : ""
                            }`}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.taken}
                    >
                        {seat.row}-{seat.number}
                    </button>
                ))}
            </div>
            <br /> <br />
            <div className="center-button">
                <button onClick={handleMarkSeatsAsTaken}>Book seats</button>
            </div>
        </div>
    );
};

export default CinemaRoomComponent;
