import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'

// Données initiales (hors composant = ne change pas au re-render)
const moviesInitiaux = [
  {
    id: 1,
    titre: 'Inception',
    description: "Un voleur s'infiltre dans les reves",
    postUrl: '',
    note: 9,
    traiterUrl: 'https://www.youtube.com/embed/YoHD9XEInc0'
  },
  {
    id: 2,
    titre: 'Interstellar',
    description: 'Un voyage au-dela de notre galaxie',
    postUrl: '',
    note: 8,
    traiterUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
  }
]
function App() {
  //  ↓ valeur actuelle   ↓ fonction pour la modifier
  const [movies, setMovies] = useState(moviesInitiaux)

  return (
    <div>
      <Routes>
        <Route path='/' element={<MovieList movies={movies} setMovies={setMovies} />} />
        <Route path="/film/:id" element={<MovieDetail movies={movies} />} />
      </Routes>
    </div>

  )
}

export default App
