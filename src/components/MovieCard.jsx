import React from 'react'

// Les props viennent directement de l'objet film : titre, description, postUrl, note
// { infos: titre } était une erreur — la prop s'appelle "titre" pas "infos"
function MovieCard({ titre, description, postUrl, note }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '200px' }}>
            <img src={postUrl} alt={titre} width="100%" style={{ minHeight: '80px', background: '#eee' }} />
            <h2>{titre}</h2>
            <p>{description}</p>
            <span>Note : {note} / 10</span>
        </div>
    )
}

export default MovieCard
