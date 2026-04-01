import { useState } from 'react'
import MovieCard from './MovieCard'
import Filtre from './Filtre'

// Données initiales (hors composant = ne change pas au re-render)
const moviesInitiaux = [
    {
        id: 1,
        titre: 'Inception',
        description: "Un voleur s'infiltre dans les reves",
        postUrl: '',
        note: 9
    },
    {
        id: 2,
        titre: 'Interstellar',
        description: 'Un voyage au-dela de notre galaxie',
        postUrl: '',
        note: 8
    }
]

function MovieList() {
    //  ↓ valeur actuelle   ↓ fonction pour la modifier
    const [movies, setMovies] = useState(moviesInitiaux)

    // les etats du formulaire d'ajout
    const [nouveauTitre, setNouveauTitre] = useState('')
    const [nouvelleDescription, setNouvelleDescription] = useState('')
    const [nouvelleNote, setNouvelleNote] = useState('');


    // Les etats des filtres
    const [filtreTitre, setFiltreTire] = useState('')
    const [filtreNote, setFiltreNote] = useState('')

    // la fonction d'ajout
    const ajouterFilm = () => {
        if (!nouveauTitre.trim()) return //   Elle bloque l'ajout d'un film si le titre est vide ou contient uniquement des espaces.
        const film = {
            id: crypto.randomUUID(),
            titre: nouveauTitre,
            description: nouvelleDescription,
            note: Number(nouvelleNote), // string est transforme en nombre
            postUrl: ''
        }
        setMovies([...movies, film])// [...] = je garde l'ancien + j'ajoute
        // vider les champs apres l'ajout
        setNouveauTitre('');
        setNouvelleDescription('');
        setNouvelleNote('');
    }
    // methode pour Filtrer selon le titre et la note
    const moviesFiltres = movies
        .filter((film) => film.titre.toLocaleLowerCase().includes(filtreTitre.toLocaleLowerCase()))
        .filter((film) => filtreNote === '' ? true : film.note >= Number(filtreNote))
    // ce que le composant affiche
    return (
        <div>

            {
                moviesFiltres.map((film) => (
                    <MovieCard
                        key={film.id}
                        {...film}
                    />
                ))
            }

            < Filtre
                filtreTitre={filtreTitre}
                filtreNote={filtreNote}
                onTitreChange={setFiltreTire}
                onNoteChange={setFiltreNote} />



            <div>
                <input
                    type='text'
                    placeholder='Titre'
                    value={nouveauTitre}
                    onChange={(e) => setNouveauTitre(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Note'
                    value={nouvelleNote}
                    onChange={(e) => setNouvelleNote(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Decris ton film'
                    value={nouvelleDescription}
                    onChange={(e) => setNouvelleDescription(e.target.value)} />
                <button onClick={ajouterFilm}>Ajouter</button>
            </div>
        </div>
    )
}

export default MovieList
