import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const { movieTitle, ticketCount } = location.state;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/movies-list');
    };

    return (
        <div className="container">

            <h8 className='text-center'>BookingConfirmation</h8>

            <h2 className='text-center'>Booking Confirmation</h2>
            <div>
                <p>Selected Movie: {movieTitle}</p>
                <p>Number of Tickets: {ticketCount}</p>
                <button className='btn btn-info' onClick={handleGoBack}>Go Back</button>
            </div>
        </div>
    );
};

export default BookingConfirmation;