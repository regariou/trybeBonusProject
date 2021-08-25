//Números de filmes disponíveis: 62 a 2405

const mainUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=ca19804bba1e445e3db2ec8fbecda738';
const urlImg = 'https://www.themoviedb.org/t/p/w220_and_h330_face';

const getDiv = document.getElementById('film-list')
const getIMG = document.getElementById('imgtest');
const getTitle = document.getElementById('titleTest');
let bannersLinks = [];

const genresObj = {// Chaves são conteúdo das opções de categoria e valores são Ids de gêneros
  'Ação': 28,
  'Aventura': 12,
  'Comédia': 35,
  'Drama': 18,
  'Suspense': 53,
  'Terror': 27
}

function createElement(element, className, content) {
  const el = document.createElement(element);
  el.className = className;
  el.innerText = content;
  return el;
};

function createImg(className, source, alt) {
  const img = document.createElement('img');
  img.className = className;
  img.src = source;
  img.alt = alt;
  return img;
};

/* const carregando = async () => {
  const section = document.createElement('section');
  section.innerHTML = 'Loading...';
  section.className = 'loading';
  document.querySelector('#film-list').appendChild(section);
}; */

// adiciona uma frase 'loading' enquanto se faz a requisição da API


async function getBannerLinks(array) {
  array.forEach((query) => {
    fetch(`https://mubi.com/services/api/search?query=${query}`)
      .then((data) => data.json())
      .then(json => json.films)
      .then((moviesList) => bannersLinks.push(moviesList[0].still_url))
  })
}

async function getTrendingFilms() {
  const trendingFilms = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=ca19804bba1e445e3db2ec8fbecda738')
    .then(data => data.json())
    .then(json => json.results)
    .then(results => results.map((film) => film.title));

  return trendingFilms;
}
// faz a requisição da API e transforma em objeto Json
const listaDeFilmes =  async (urlApi) => {
  // carregando();
  getDiv.innerHTML = '';
  const lista = await fetch(urlApi);
  const listaJson = await lista.json();
  listaJson.results.forEach(({ title, vote_average, poster_path, overview}) => {
    if (poster_path) {
      const thumbnail = urlImg + poster_path;
      const title2 = title;
      const note = vote_average;
      const img = createImg('imgTest', thumbnail, overview)
      const div = createElement('div', 'filme', '')
      const h2 = createElement('h2', 'filmTitle', `${title2} ${note}`)
      div.appendChild(img);
      div.appendChild(h2);
      getDiv.appendChild(div);
    }
  });
};

// Recebe uma Id de um gênero e retorna a URL para requisição da Api
const urlByGenre = (genreId) => `https://api.themoviedb.org/3/discover/movie?api_key=ca19804bba1e445e3db2ec8fbecda738&with_genres=${genreId}&sort_by=prelease_date.desc`;
// Responsável por listar filmes por gênero
function listByGenre(event) {
  const genre = event.target.innerText;
  const keyId = genresObj[genre];
  listaDeFilmes(urlByGenre(keyId));
}

window.onload = async () => {
  listaDeFilmes(mainUrl);
  const trendingMovies = await getTrendingFilms()
  getBannerLinks(trendingMovies);

  document.querySelectorAll('.options li')
    .forEach((li) => li.addEventListener('click', listByGenre));
};
