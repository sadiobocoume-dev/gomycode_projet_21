# Application Cinéma — React Hooks & Router

Application React permettant de consulter une liste de films, de les filtrer, d'en ajouter, et d'accéder à la page de détail de chaque film avec sa bande-annonce.

---

## Architecture

```
main.jsx
  └── BrowserRouter
        └── App                   ← source unique des données
              ├── Route /         → MovieList
              │     ├── MovieCard (×N)
              │     └── Filtre
              └── Route /film/:id → MovieDetail
```

---

## Rôle des composants

### `main.jsx` — Point d'entrée
Démarre l'application et l'injecte dans le HTML (`<div id="root">`).

**Concepts :**
- `createRoot` — monte React dans le DOM
- `BrowserRouter` — active le système de routing pour toute l'app. Il doit être le plus haut possible dans l'arbre pour que tous les composants enfants puissent naviguer

---

### `App.jsx` — Chef d'orchestre
Détient la source unique de données (`movies[]`) et définit les routes de l'application.

**Concepts :**
- **State lifting** — `movies` et `setMovies` vivent ici pour être partagés entre `MovieList` et `MovieDetail`, qui en ont tous les deux besoin
- `Routes` / `Route` — carte des pages : selon l'URL, React affiche un composant différent
- **Paramètre dynamique** `:id` — `/film/:id` capture n'importe quel id dans l'URL

---

### `MovieList.jsx` — Page d'accueil
Affiche la liste des films, permet de filtrer et d'ajouter un film.

**Concepts :**
- **Props reçues** `{ movies, setMovies }` — les données viennent du parent `App`
- `useState` local — pour les états qui n'appartiennent qu'à cette page : `filtreTitre`, `filtreNote`, `nouveauTitre`, `nouvelleDescription`, `nouvelleNote`
- **Données dérivées** — `moviesFiltres` n'est pas un state, c'est une variable calculée à partir de `movies` + les filtres. Elle se recalcule automatiquement à chaque render
- `.filter()` chaîné — deux filtres appliqués successivement (titre puis note)
- `setMovies([...movies, film])` — spread operator pour créer un nouveau tableau sans muter l'ancien (immutabilité React)

---

### `MovieCard.jsx` — Carte d'un film
Affiche les infos d'un film et navigue vers sa page de détail au clic.

**Concepts :**
- **Composant presentationnel** — ne gère aucun state, reçoit tout via props
- `useNavigate` — hook de React Router qui retourne une fonction de navigation. Au clic, envoie l'utilisateur vers `/film/:id`
- `{postUrl && <img />}` — rendu conditionnel, évite de passer une string vide à `src`
- `{...film}` dans `MovieList` — spread de props, raccourci pour passer toutes les propriétés d'un objet

---

### `Filtre.jsx` — Barre de filtres
Affiche les inputs de recherche et remonte les valeurs à `MovieList`.

**Concepts :**
- **Composant contrôlé** — `value={filtreTitre}` + `onChange` : React contrôle ce qui est affiché dans l'input, pas le DOM
- **Inversion de contrôle** — `Filtre` ne possède pas le state, il appelle `onTitreChange` / `onNoteChange` pour que le parent (`MovieList`) le mette à jour. C'est le pattern classique pour faire remonter des événements

---

### `MovieDetail.jsx` — Page de détail
Affiche la description complète et la bande-annonce d'un film.

**Concepts :**
- `useParams` — lit les paramètres dynamiques de l'URL (`:id`), toujours une **string**
- `movies.find()` + `String(f.id) === id` — conversion de type nécessaire car l'id en URL est une string mais l'id dans les objets peut être un number
- `useNavigate(-1)` — retour à la page précédente (comme le bouton "back" du navigateur)
- `<iframe>` — intègre la vidéo YouTube directement dans la page via l'URL `embed`
- Rendu conditionnel `if (!film)` — gère le cas où l'id n'existe pas
