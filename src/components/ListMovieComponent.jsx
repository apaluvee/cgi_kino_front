import React, { useEffect, useState } from 'react'
import { deleteMovie, getAllMovies, takeSeat } from '../services/MovieService'
import { useNavigate } from 'react-router-dom'

const ListMovieComponent = () => {

    const [movies, setMovies] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        listMovies();
    }, [])

    function listMovies() {
        getAllMovies().then((response) => {
            setMovies(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewMovie() {
        navigate('/add-movie')
    }

    function updateMovie(id) {
        console.log(id)
        navigate(`/update-movie/${id}`)
    }

    function removeMovie(id) {
        deleteMovie(id).then((response) => {
            listMovies()
        }).catch(error => {
            console.error(error);
        })
    
    }

    function seatTaken(id) {
        takeSeat(id).then((response) => {
            listMovies()
        }).catch(error => {
            console.error(error);
        })
    }



  return (
    <div className='container'>

     <h2 className='text-center'>List of Movies</h2> 
     <button className='btn btn-primary mb-2' onClick={addNewMovie}>Add Movie</button>
     <div>
        <table className='table table-bordered table-striped'>
            <thread>
                <tr>
                    <th>Movie Title</th>
                    <th>Seat taken</th>
                    <th>Actions</th>
                </tr>
            </thread>
            <tbody>
                {
                    movies.map(movie => 
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.taken ? 'Taken': 'Free'}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateMovie(movie.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeMovie(movie.id)} style={{marginLeft : "10px"}} >Delete</button>
                                <button className='btn btn-success' onClick={() => seatTaken(movie.id)} style={{marginLeft : "10px"}} >Take</button>
                            </td>
                        </tr>
                    )
                }   
            </tbody>
        </table> 
     </div>
     

    </div>
  )
}

export default ListMovieComponent