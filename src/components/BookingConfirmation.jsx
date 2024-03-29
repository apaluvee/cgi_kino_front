import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const { movieTitle, ticketCount, movieGenre, movieAgeRating, movieLanguage, movieStartTime } = location.state;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/movies-list');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const hour = ('0' + date.getHours()).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        
        return `${day}/${month}/${year}, ${hour}:${minute}`;
    };

    return (
        <div className="container">

            <h8 className='text-center'>BookingConfirmation</h8>

            <h2 className='text-center'>Booking Confirmation</h2>
            <div>
                <p>Selected Movie: {movieTitle}</p>
                <p>Genre: {movieGenre}</p>
                <p>Age Rating: {movieAgeRating}</p>
                <p>Language: {movieLanguage}</p>
                <p>Movie starting time: {formatDate(movieStartTime)}</p>
                <p>Number of Tickets: {ticketCount}</p>
                <button className='btn btn-info' onClick={handleGoBack}>Go Back</button>
            </div>
        </div>
    );
};

export default BookingConfirmation;