async function fetchData() {
  const response = await fetch("https://api.jikan.moe/v4/anime");
  return (await response.json()).data;
}

async function render(animes) {
  console.log(animes);
  animes.forEach((a) => {
    addElement(a);
  });
}

async function run() {
  const animes = await fetchData();
  await render(animes);
}

function addElement(anime) {
  const animeDiv = document.createElement("div");
  animeDiv.id = anime.mal_id;
  const text = document.createTextNode(anime.title);
  animeDiv.appendChild(text);
  const animeImg = document.createElement("img");
  animeImg.src = anime.images.webp.image_url;
  animeImg.alt = `${anime.title}_img`;
  animeDiv.setAttribute("class", "anime-wrapper");
  animeDiv.appendChild(animeImg);

  const appDiv = document.getElementById("app");

  appDiv.appendChild(animeDiv);
}

run();
