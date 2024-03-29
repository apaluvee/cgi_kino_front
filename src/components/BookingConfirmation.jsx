import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const { movieTitle, ticketCount, movieGenre, movieAgeRating, movieLanguage, movieStartTime } = location.state;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
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
            <h2 className='heading-title'>Booking Confirmation</h2>
            <div className='content-main'>
                <div className='booking-confirmation'>
                    <div className='booking-columns'>
                        <div className='booking-labels'>
                            <p>Selected Movie:</p>
                            <p>Genre: </p>
                            <p>Age Rating: </p>
                            <p>Language: </p>
                            <p>Movie starting time: </p>
                            <p>Number of Tickets: </p>
                        </div>
                        <div className='booking-values'>
                            <p className='bold-text'>{movieTitle}</p>
                            <p className='bold-text'>{movieGenre}</p>
                            <p className='bold-text'>{movieAgeRating}</p>
                            <p className='bold-text'>{movieLanguage}</p>
                            <p className='bold-text'>{formatDate(movieStartTime)}</p>
                            <p className='bold-text'>{ticketCount}</p>
                        </div>
                    </div>
                    <button className='btn btn-info' onClick={handleGoBack}>Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;