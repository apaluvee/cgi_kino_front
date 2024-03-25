import React, { useEffect, useState } from 'react';
import { deleteMovie, getAllMovies } from '../services/MovieService';
import { useNavigate, Link } from 'react-router-dom';

const ListMovieComponent = () => {
    const [movies, setMovies] = useState([]);
    const [ticketCount, setTicketCount] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        listMovies();
    }, []);

    function listMovies() {
        getAllMovies()
            .then((response) => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addNewMovie() {
        navigate('/add-movie');
    }

    function updateMovie(id) {
        navigate(`/update-movie/${id}`);
    }

    function removeMovie(id) {
        deleteMovie(id)
            .then(() => {
                listMovies();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Movies</h2>
            <button className='btn btn-primary mb-2' onClick={addNewMovie}>Add Movie</button>
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
                                    <td>{movie.taken ? 'Taken' : 'Free'}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateMovie(movie.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeMovie(movie.id)} style={{ marginLeft: "10px" }} >Delete</button>

                                        <Link to={`/cinema-room/${movie.id}?ticketCount=${ticketCount}`} className="btn btn-success" style={{ marginLeft: "10px" }}>Select tickets</Link>

                                        <input type="number" value={ticketCount} onChange={(e) => setTicketCount(parseInt(e.target.value))} min="1" />
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
