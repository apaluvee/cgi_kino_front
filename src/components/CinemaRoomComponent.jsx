import React, { useEffect, useState } from 'react';
import { getCinemaRoom, markSeatsAsTaken } from '../services/CinemaRoomService';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const CinemaRoomComponent = () => {
    const [cinemaRoomId, setCinemaRoomId] = useState(null);
    const [cinemaRoom, setCinemaRoom] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ticketCountParam = queryParams.get('ticketCount');
    const initialTicketCount = ticketCountParam ? parseInt(ticketCountParam) : 1;
    const navigate = useNavigate();

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

    useEffect(() => {
        if (initialTicketCount > 0 && cinemaRoom) {
            const initialSelectedSeats = cinemaRoom.seats
                .filter(seat => !seat.taken)
                .slice(0, initialTicketCount)
                .map(seat => seat.id);
            setSelectedSeats(initialSelectedSeats);
        }
    }, [initialTicketCount, cinemaRoom]);

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prevSelectedSeats) => {
            let updatedSelectedSeats = [...prevSelectedSeats];
            const index = updatedSelectedSeats.indexOf(seatId);
            
            if (index === -1) {
                
                const availableSeats = cinemaRoom.seats
                    .filter(seat => !seat.taken)
                    .map(seat => seat.id);
                const clickedSeatIndex = availableSeats.indexOf(seatId);
                updatedSelectedSeats = availableSeats.slice(clickedSeatIndex, clickedSeatIndex + initialTicketCount);
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
                navigate('/movies');
            })
            .catch((error) => {
                console.error("Error marking seats as taken:", error);
            });
    };

    const handleCancelSelection = () => {
        setSelectedSeats([]);
    };

    if (!cinemaRoom) {
        return <div>Loading...</div>;
    }

    const sortedSeats = [...cinemaRoom.seats].sort((a, b) => a.id - b.id);

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
              <h2>{cinemaRoom.title}</h2>
            </div>

            <div className="screen-container">
              <div className="screen"></div>
            </div>

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
                <Link to={`/movies`} className="btn btn-success" onClick={handleMarkSeatsAsTaken}>Book tickets</Link>
                <button className="btn btn-danger" onClick={handleCancelSelection} style={{ marginLeft: "10px" }}>Clear selection</button>
            </div>
        </div>
    );
};

export default CinemaRoomComponent;
