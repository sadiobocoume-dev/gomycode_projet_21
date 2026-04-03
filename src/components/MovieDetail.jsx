import { useParams, useNavigate } from 'react-router-dom'

// on recoit la liste complete des films pour trouver le bon
function MovieDetail({ movies }) {
    const { id } = useParams(); // recupere l'id
    const navigate = useNavigate();

    // id de l'Url est une String,
    //  les id des films peuvent etre number ou string
    const film = movies.find(f => String(f.id) === id)

    if (!film) {
        return (
            <div>
                <p>Film introuvable.</p>
                <button onClick={() => navigate('/')}>
                    Retour à l'accueil
                </button>
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem' }}>
            <button onClick={() => navigate(-1)}>← Retour</button>
            <h1>{film.titre}</h1>
            <p>{film.description}</p>
            <p>Note : {film.note}</p>

            {film.traiterUrl && (
                <div>
                    <h3>Bande-annonce</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={film.traiterUrl}
                        title={`Bande-annonce - ${film.titre}`}
                        allowFullscreen
                    />
                </div>
            )}

        </div>
    )


}
export default MovieDetail;