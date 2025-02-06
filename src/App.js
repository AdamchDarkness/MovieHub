import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Movies from './Pages/Movies/Movies';
import Navbar from './Components/Navbar/Navbar';
import Favorites from './Pages/Favorites/Favorites';
import MovieCard from './Components/MovieCard/MovieCard';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movie" element={<Movies/>}/>
        <Route path="/favourite" element={<Favorites/>}/>
        <Route path="/movie/:id" element={<MovieCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
