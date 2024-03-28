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

    return (
        <div className='container'>
            
            <h8 className='text-center'>AvailableMoviesComponent</h8>

            <h2 className='text-center'>Available Movies</h2>
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map(movie => (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
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
