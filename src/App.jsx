import './App.css'
import ListMovieComponent from './components/ListMovieComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MovieComponent from './components/MovieComponent'
import CinemaRoomComponent from './components/CinemaRoomComponent';
import BookingConfirmation from './components/BookingConfirmation';
import AvailableMoviesComponent from './components/AvailableMoviesComponent'
import SelectTicketsComponent from './components/SelectTicketsComponent'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
        <Routes>
          {/* http://localhost:8080 */}
          <Route path='/' element = { <ListMovieComponent/> }></Route>

          {/* http://localhost:8080/movies */}
          <Route path='/movies' element = { <ListMovieComponent/> }></Route>

          {/* http://localhost:8080/add-movie */}
          <Route path='/add-movie' element = { <MovieComponent/> }></Route>

          {/* http://localhost:8080/update-movie/1 */}
          <Route path='/update-movie/:id' element = { <MovieComponent/> }></Route>

          {/* http://localhost:8080/cinema-room/1?ticketCount=2 */}
          <Route path="/cinema-room/:id" element={<CinemaRoomComponent/> }></Route>

          <Route path="/booking-confirmation" element={<BookingConfirmation />} />

          <Route path="/movies-list" element={<AvailableMoviesComponent />} />

          <Route path="/tickets/:id" element={<SelectTicketsComponent />} />
          
        </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
