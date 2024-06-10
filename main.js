let page = 0;
const allAnimes = [];

async function fetchData(page = 1) {
  const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
  return (await response.json()).data;
}

async function render(animes) {
  console.log(animes);
  animes.forEach((a) => {
    addElement(a);
  });
}

async function run() {
  for (let index = 0; index < 10; index++) {
    if (index > 0) {
      await wait(1000);
    }
    page = index + 1;
    const animes = await fetchData(page);
    allAnimes.push(...animes);
    await render(animes);
  }
  processAll(allAnimes);
}

function processAll(animes) {
  console.log("All Animes", animes);

  const genres = [
    ...new Set(animes.map((anime) => anime.genres.map((g) => g.name)).flat()),
  ];

  const genreScores = [];

  for (const genreName of genres) {
    const animesByGenre = animes.filter((a) =>
      a.genres.some((g) => g.name === genreName)
    );
    const scoreByGenre =
      Math.round(
        (animesByGenre.map((a) => a.score).reduce((acc, cur) => acc + cur, 0) /
          animesByGenre.length) *
          1000
      ) / 1000;

    genreScores.push({
      name: genreName,
      score: scoreByGenre,
      animes: animesByGenre,
    });
  }

  const sortedGenreScores = genreScores.sort((a, b) =>
    a.score > b.score ? -1 : 1
  );
  console.log("Sorted Genres by Avg Score", sortedGenreScores);
}

function addElement(anime) {
  const animeDiv = document.createElement("div");
  animeDiv.id = anime.mal_id;
  const text = document.createTextNode(anime.title);
  animeDiv.appendChild(text);
  const animeImg = document.createElement("img");
  animeImg.src = anime.images.webp.image_url;
  animeImg.setAttribute("loading", "lazy");
  animeImg.alt = `${anime.title}_img`;
  animeDiv.setAttribute("class", "anime-wrapper");
  animeDiv.appendChild(animeImg);

  const appDiv = document.getElementById("app");

  appDiv.appendChild(animeDiv);
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

run();
