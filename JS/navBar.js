import { listaDeFilmes, apiKey } from './main.js';

const genresObj = {// Chaves são conteúdo das opções de categoria e valores são Ids de gêneros
  'Ação': 28,
  'Aventura': 12,
  'Comédia': 35,
  'Drama': 18,
  'Suspense': 53,
  'Terror': 27
}

// Recebe uma Id de um gênero e retorna a URL para requisição da Api
const urlByGenre = (genreId) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=prelease_date.desc`;

// Responsável por listar filmes por gênero
function listByGenre(event) {
  const genre = event.target.innerText;
  const keyId = genresObj[genre];
  listaDeFilmes(urlByGenre(keyId));
}

const urlByRank = () => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=vote_average.desc&sort_by=vote_count.desc`;

const listByRank = () => listaDeFilmes(urlByRank());

const urlBySuccess = () => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=revenue.desc`

const listBySuccess = () => listaDeFilmes(urlBySuccess());

export { genresObj, urlByGenre, listByGenre, listByRank, listBySuccess };