import React, { useEffect, useState } from 'react';
import { getMovie } from '../services/MovieService';
import { useParams, Link } from 'react-router-dom';

const ListMovieComponent = () => {
    const [movie, setMovie] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        loadMovieDetails(id);
    }, [id]);

    const loadMovieDetails = (id) => {
        getMovie(id)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='container'>

            <h8 className='text-center'>SelectTicketsComponent</h8>

            {movie && (
                <>
                    <h2 className='text-center'>Selected Movie: {movie.title}</h2>
                    <div>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Starting Time</th>
                                    <th>Select Tickets</th>
                                    <th>Ticket Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{movie.startTime}</td>
                                    <td>
                                        <Link to={`/cinema-room/${movie.id}?ticketCount=${ticketCount}`} className="btn btn-success" style={{ marginLeft: "10px" }}>Select tickets</Link>
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={ticketCount} 
                                            onChange={(e) => setTicketCount(parseInt(e.target.value))} 
                                            min="1" 
                                            style={{ marginLeft: "10px", width: "50px" }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default ListMovieComponent;
