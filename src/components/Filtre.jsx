import React from 'react'

// Filtre reçoit les valeurs actuelles + les fonctions pour les changer (depuis MovieList)
function Filtre({ filtreTitre, filtreNote, onTitreChange, onNoteChange }) {
    return (
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
            {/* Filtre par titre : recherche en temps réel */}
            <input
                type='text'
                placeholder='Rechercher par Titre'
                value={filtreTitre}
                onChange={(e) => onTitreChange(e.target.value)}
            />

            {/* Filtre par note minimale */}
            <select
                value={filtreNote}
                onChange={(e) => onNoteChange(e.target.value)}
            >

                <option value="">Toutes les notes</option>
                <option value="7">Note ≥ 7</option>
                <option value="8">Note ≥ 8</option>
                <option value="9">Note ≥ 9</option>


            </select>
        </div>
    )
}

export default Filtre
