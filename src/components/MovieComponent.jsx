import React, { useEffect } from 'react'
import { useState } from 'react'
import { getMovie, saveMovie, updateMovie } from '../services/MovieService'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const MovieComponent = () => {

    const navigate = useNavigate()
    const {id} = useParams()

    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        ageRating: '',
        startTime: '',
        language: ''
    });

    useEffect(() => {
        if (id) {
            getMovie(id)
                .then(response => {
                    setMovie(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setMovie(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveOrUpdateMovie = e => {
        e.preventDefault();
        if (id) {
            updateMovie(id, movie)
                .then(response => {
                    navigate('/movies');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            saveMovie(movie)
                .then(response => {
                    navigate('/movies');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div className='container'>
            <br /> <br />
            <div className='content-main'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='heading-title'>{id ? 'Update Movie' : 'Add Movie'}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Movie Title:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Movie Title'
                                        name='title'
                                        value={movie.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Genre:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Genre'
                                        name='genre'
                                        value={movie.genre}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Age Rating:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Age Rating'
                                        name='ageRating'
                                        value={movie.ageRating}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Start Time:</label>
                                    <input
                                        type='datetime-local'
                                        className='form-control'
                                        name='startTime'
                                        value={movie.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Language:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Language'
                                        name='language'
                                        value={movie.language}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className='btn btn-success' onClick={saveOrUpdateMovie}> Save </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieComponent;