import React, { useEffect } from 'react'
import { useState } from 'react'
import { getMovie, saveMovie, updateMovie } from '../services/MovieService'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const MovieComponent = () => {

    const [title, setTitle] = useState('')
    const [taken, setTaken] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()


    
    function saveOrUpdateMovie(e){
        e.preventDefault()

        const movie = {title, taken}
        console.log(movie)

        if (id) {
            updateMovie(id, movie).then((response) => {
                navigate('/movies')
            }).catch(error => {
                console.error(error);
            })

        } else {
            saveMovie(movie).then((response) => {
                console.log(response.data)
                navigate('/movies')
            }).catch(error => {
                console.error(error);
            })

        }

        
    }

    function pageTitle(){
        if(id) {
            return <h2 className='text-center'>Update Movie</h2>
        } else {
            return <h2 className='text-center'>Add Movie</h2>
        }
    }

    useEffect(()=> {
        if(id){

            getMovie(id).then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
            }).catch(error=> {
                console.error(error)
            })
        }

    }, [id])

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                { pageTitle() }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Movie Title:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Movie Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </input>
                        </div>

                        <button className='btn btn-success' onClick={ (e) => saveOrUpdateMovie(e)}>Save</button>
                    </form>

                </div>
            </div>

        </div>
    </div>
  )
}

export default MovieComponent