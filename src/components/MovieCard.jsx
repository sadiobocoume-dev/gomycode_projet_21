import React from 'react'
import { useNavigate } from 'react-router-dom'

// Les props viennent directement de l'objet film : titre, description, postUrl, note
// { infos: titre } était une erreur — la prop s'appelle "titre" pas "infos"
function MovieCard({ id, titre, description, postUrl, note }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/film/${id}`)}
            style={

                {
                    border: '1px solid #ccc',
                    padding: '1rem', margin: '1rem',
                    width: '200px'
                }}
        >
            {postUrl && <img src={postUrl} alt={titre} width="100%" style={{ minHeight: '80px', background: 'lightpink' }} />}
            <h2>{titre}</h2>
            <p>{description}</p>
            <span>Note : {note} / 10</span>
        </div>
    )
}

export default MovieCard
