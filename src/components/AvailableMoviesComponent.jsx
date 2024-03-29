import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../services/MovieService';
import { Link, useNavigate } from 'react-router-dom';

const AvailableMoviesComponent = () => {
    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        listMovies();
    }, []);

    function listMovies() {
        getAllMovies()
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

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
        <div className='container'>
            
            <h8 className='text-center'>AvailableMoviesComponent</h8>

            <h2 className='text-center'>Available Movies</h2>
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Genre</th>
                            <th>Age Rating</th>
                            <th>Start Time</th>
                            <th>Language</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map(movie => (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.ageRating}</td>
                                    <td>{formatDate(movie.startTime)}</td>
                                    <td>{movie.language}</td>
                                    <td>
                                        <Link to={`/tickets/${movie.id}`} className="btn btn-success">Select Movie</Link>
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

export default AvailableMoviesComponent;
