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



    //preselecting must be centered
    useEffect(() => {
        if (initialTicketCount > 0 && cinemaRoom) {
            const availableSeats = cinemaRoom.seats.filter(seat => !seat.taken);
            const rowCount = Math.max(...availableSeats.map(seat => seat.row));
            const middleRow = Math.floor(rowCount / 2);
    
            const seatsInMiddleRow = availableSeats.filter(seat => seat.row === middleRow);
            const seatCountInMiddleRow = seatsInMiddleRow.length;
            let middleSeatInMiddleRow = Math.floor(seatCountInMiddleRow / 2);
    
            const initialSelectedSeats = [];

            if (initialTicketCount === 1) {
                middleSeatInMiddleRow = Math.floor(seatCountInMiddleRow / 2);
                initialSelectedSeats.push(seatsInMiddleRow[middleSeatInMiddleRow].id);
            } else {
                const startSeatIndex = Math.max(0, middleSeatInMiddleRow - Math.floor(initialTicketCount / 2));
                let selectedCount = 0;
                for (let i = startSeatIndex; i < seatsInMiddleRow.length; i++) {

                    if (selectedCount >= initialTicketCount) break;
                    initialSelectedSeats.push(seatsInMiddleRow[i].id);
                    selectedCount++;
                }
                let remainingTickets = initialTicketCount - selectedCount;

                if (remainingTickets > 0) {
                    let rowIndex = middleRow + 1;
                    
                    while (remainingTickets > 0 && rowIndex <= rowCount) {
                        const seatsInRow = availableSeats.filter(seat => seat.row === rowIndex);
                        for (let i = 0; i < seatsInRow.length; i++) {
                            if (remainingTickets === 0) break;
                            initialSelectedSeats.push(seatsInRow[i].id);
                            remainingTickets--;
                        }
                        rowIndex++;
                    }
                    
                    if (remainingTickets > 0) {
                        const startSeat = initialSelectedSeats[0];
                        const startIndex = availableSeats.findIndex(seat => seat.id === startSeat);
                        for (let i = startIndex - 1; i >= 0 && remainingTickets > 0; i--) {
                            initialSelectedSeats.unshift(availableSeats[i].id);
                            remainingTickets--;
                        }
                    }
                }
            }
            setSelectedSeats(initialSelectedSeats);
        }
    }, [initialTicketCount, cinemaRoom]);
    



    const handleSeatClick = (seatId) => {
        setSelectedSeats((prevSelectedSeats) => {
            const clickedSeatIndex = cinemaRoom.seats.findIndex(seat => seat.id === seatId);

            const availableSeats = cinemaRoom.seats.filter(seat => !seat.taken);
            
            const startIndex = Math.max(0, clickedSeatIndex - Math.floor(initialTicketCount / 2));
            const updatedSelectedSeats = availableSeats.slice(startIndex, startIndex + initialTicketCount);
    
        
            const remainingCount = initialTicketCount - updatedSelectedSeats.length;

            if (remainingCount > 0) {
                const adjustedStartIndex = Math.max(0, startIndex - remainingCount);
                const remainingSeats = availableSeats.slice(adjustedStartIndex, startIndex);
                updatedSelectedSeats.unshift(...remainingSeats);
            }
    
            return updatedSelectedSeats.map(seat => seat.id);
        });
    };
    
    

    const handleMarkSeatsAsTaken = () => {
        markSeatsAsTaken(cinemaRoomId, selectedSeats)
            .then(() => {
                console.log("Seats marked as taken successfully");
                setSelectedSeats([]);
                setRefresh(prevRefresh => !prevRefresh);
                
                
                navigate('/booking-confirmation', {
                    state: {
                      movieTitle: cinemaRoom.title,
                      ticketCount: selectedSeats.length,

                    }
                });
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