# MovieHub
Application web de gestion de films créée avec React et connectée à l’API TMDB (The Movie Database). Elle permet : \
• De consulter les films (avec possibilité de filtrer ou d’effectuer une recherche). \
•	De voir le détail de chaque film (description, casting, films similaires). \
•	De gérer une liste de favoris (mise à jour en localStorage). \
Tous le projet a été réaliser en React et le style en utilisant tailwindcss . 

![image](https://github.com/user-attachments/assets/25063fed-f202-49d7-9ae3-21a11d33bcb7)
## 1. Structure du projet
### 1.1. App.js
Le composant racine de l’application. Il gère les routes principales grâce à React Router : \
•	Home : la page d’accueil (liste de films populaires, top rated, etc.). \
•	Movies : la page pour consulter l’ensemble des films, filtrer par genre, effectuer des recherches et paginer. \
•	Favorites : la page de gestion des favoris. \
•	MovieCard : affichage détaillé d’un film (cast, films similaires, etc.). 
## 1.2. Composants Principaux 
### 1.2.1. Navbar.js
Barre de navigation avec plusieurs liens : \
•	Home ("/") \
•	Movies ("/movie") \
•	Favorites ("/favourite") \
Utilisation de NavLink de React Router pour ajouter une classe active. 
### 1.2.2. Hero.js
Section d’en-tête. Affiche un titre et deux boutons permettant de rediriger vers : \
•	All Movies : la liste complète. \
•	Favourite : la liste des favoris. 
### 1.2.3. Caroussel.js
Un carrousel (slider) qui affiche des images. Il s’appuie sur un tableau d’images (customImages) et gère l’index actif via un état local (activeIndex).
### 1.2.4. MoviesList.js
Affiche un certain nombre de films (prop nbrResultats) selon un type (prop type) : \
•	now_playing \
•	popular \
•	top_rated \
•	upcoming \
Se base sur l’API de TMDB pour récupérer et afficher les affiches (poster_path) et d’autres informations sur le film. \
Implémente aussi la gestion des favoris (stockage dans localStorage). 
### 1.2.5. MovieCard.js
Page de détail d’un film : \
•	Récupère l’ID du film depuis l’URL (useParams()). \
•	Va chercher les détails du film via l’API TMDB, puis affiche : \
  o	le titre, la description, la date de sortie, la durée, l’évaluation, etc. \
  o	le casting (requête credits) : affiche les principaux acteurs et leurs rôles. \
  o	les films similaires (requête similar). \
Cette page propose aussi un bouton Add to Favorites ou Remove from Favorites. 
### 1.2.6. SearchMovie.js
Un composant (optionnel) de barre de recherche : \
•	Permet la saisie du titre d’un film. \
•	Fait appel à l’API search/movie de TMDB pour des suggestions. \
•	Gère un historique de recherche searchHistory stocké dans le localStorage. \
•	Propose aussi un tri par popularité, évaluation, date de sortie, etc. 
### 1.2.7. PaginatedMovies.js
Affiche une liste de films avec un système de pagination géré localement : \
•	currentPage (état local) qui change quand on clique sur Next/Previous. \
•	Récupère et affiche une partie seulement des films pour chaque page. 
## 1.3. Pages
### 1.3.1. Home.js
Page d’accueil qui affiche : \
•	Le composant Hero. \
•	Le composant Caroussel. \
•	Une sélection de trois listes : Popular, Top Rated et Now Playing (6 films chacun). 
### 1.3.2. Movies.js
Page pour explorer et chercher des films : \
•	Tabs (Popular, Top Rated, Upcoming). \
•	Recherche par titre. \
•	Filtrage par genre. \
•	Tri (par popularité, date de sortie, note). \
•	Pagination sur le résultat de la recherche ou de la liste. 
### 1.3.3. Favorites.js
Page qui liste les films favoris (ceux dont l’ID se trouve dans localStorage). \
Pour l’affichage, on réutilise une partie de la logique qui va chercher chaque film par ID ou on stocke directement les objets dans le localStorage au moment de l’ajout (selon votre implémentation). \
(NB : Votre code pour la page Favorites n’est pas inclus dans votre message, mais la logique se base généralement sur la récupération des IDs favoris depuis localStorage et l’affichage de la liste correspondante.) 
## 2. Gestion des Favoris (localStorage)
Utilisation de localStorage pour stocker un tableau d’IDs de films favoris : \
•	Au montage des composants (par exemple MoviesList ou MovieCard), on lit localStorage.getItem("favorites"). \
•	Au clic sur le bouton cœur ou Add to Favorites, on met à jour la liste puis on la renvoie dans localStorage.setItem("favorites",JSON.stringify(updatedFavorites)). \
Cette approche est simple mais ne permet pas de synchroniser les favoris entre différents appareils/navigateurs, ni de garder les données si l’utilisateur vide son localStorage. 
