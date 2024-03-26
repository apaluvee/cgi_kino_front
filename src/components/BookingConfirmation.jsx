import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const { movieTitle, ticketCount } = location.state;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/movies');
    };

    return (
        <div>
            <h2>Booking Confirmation</h2>
            <div>
                <p>Selected Movie: {movieTitle}</p>
                <p>Number of Tickets: {ticketCount}</p>
                <button onClick={handleGoBack}>Go Back</button>
            </div>
        </div>
    );
};

export default BookingConfirmation;