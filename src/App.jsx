import { useState } from 'react'

import MovieList from './components/MovieList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MovieList />
    </div>

  )
}

export default App
