import React, { useEffect, useState } from 'react';
import { getMovie, getAllMovies } from '../services/MovieService';
import { getFreeSeatCount } from '../services/CinemaRoomService';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ListMovieComponent = () => {
    const [movies, setMovies] = useState([]);
    const [ticketCount, setTicketCount] = useState(1);
    const [availableSeats, setAvailableSeats] = useState({});
    const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getMovie(id)
                .then(response => {
                    const movie = response.data;
                    setSelectedMovieTitle(movie.title); // Set the selected movie title
                    setMovies([movie]); // Display only the selected movie
                    updateAvailableSeats([movie]);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            listMovies();
        }
    }, [id]);

    function listMovies() {
        getAllMovies()
            .then(response => {
                setMovies(response.data);
                updateAvailableSeats(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function updateAvailableSeats(movies) {
        const seatCounts = {};
        const promises = movies.map(movie => {
            return getFreeSeatCount(movie.id)
                .then(response => {
                    seatCounts[movie.id] = response.data;
                })
                .catch(error => {
                    console.error(error);
                    seatCounts[movie.id] = 0;
                });
        });

        Promise.all(promises)
            .then(() => {
                setAvailableSeats(seatCounts);
            });
    }

    return (
        <div className='container'>
            <h2 className='text-center'>{selectedMovieTitle ? `Selected Movie: ${selectedMovieTitle}` : 'Movies List'}</h2>
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Seats available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map(movie => (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
                                    <td>{availableSeats[movie.id]}</td>
                                    <td>
                                        {availableSeats[movie.id] >= ticketCount ? (
                                            <Link to={`/cinema-room/${movie.id}?ticketCount=${ticketCount}`} className="btn btn-success" style={{ marginLeft: "10px" }}>Select tickets</Link>
                                        ) : (
                                            <button disabled className="btn btn-secondary" style={{ marginLeft: "10px" }}>Not enough seats</button>
                                        )}
                                        <input 
                                            type="number" 
                                            value={ticketCount} 
                                            onChange={(e) => setTicketCount(parseInt(e.target.value))} 
                                            min="1" 
                                            style={{ marginLeft: "10px", width: "50px" }}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListMovieComponent;
