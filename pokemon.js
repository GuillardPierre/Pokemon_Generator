const cardContainer = document.querySelector(".content-card");
const zoneAffichagePokemon = document.querySelector(".image");
const card = document.querySelectorAll(".card");
const zoneNomPokemon = document.querySelector(".pokemonName");
console.log(zoneNomPokemon);
const zonePvPokemon = document.querySelector(".PV");
const zoneTalents = document.querySelector(".talents");
const boutton = document.querySelector(".btnGeneration");
const url = "https://api-pokemon-fr.vercel.app/api/v1/gen/1";
let listePokemonGen1 = [];
function NombreRandom(max) {
  return Math.floor(Math.random() * max);
}

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    listePokemonGen1 = data;
    console.log(listePokemonGen1);
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });

boutton.addEventListener("click", () => {
  let nbreRandom = NombreRandom(listePokemonGen1.length);
  pokemonAleatoire(nbreRandom);
});

function pokemonAleatoire(nbreRandom) {
  if (zoneAffichagePokemon.childElementCount > 0) {
    zoneAffichagePokemon.innerHTML = "";
    zoneNomPokemon.innerHTML = "";
    zonePvPokemon.innerHTML = "";
  }
  const nomPokemon = listePokemonGen1[nbreRandom].name.fr;
  console.log(nomPokemon);
  zoneNomPokemon.innerHTML = nomPokemon;
  const pvPokemon = listePokemonGen1[nbreRandom].stats.hp;
  console.log(pvPokemon);
  zonePvPokemon.innerHTML = `PV:${pvPokemon}`;
  const imagePokemon = listePokemonGen1[nbreRandom].sprites.regular;
  const img = document.createElement("img");
  img.setAttribute("src", imagePokemon);
  zoneAffichagePokemon.appendChild(img);
  const talents = listePokemonGen1[nbreRandom].talents;
  const nbrDegat = listePokemonGen1[nbreRandom].stats;
  console.log(talents, nbrDegat);
  zoneTalents.innerHTML = `<span>${talents[0].name}:</span>  ${nbrDegat.atk} <br><span>${talents[1].name}:</span>  ${nbrDegat.def}`;
}

card.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    let elRect = el.getBoundingClientRect();

    let x = e.clientX - elRect.x;
    let y = e.clientY - elRect.y;

    let midCardWidth = elRect.width / 2;
    let midCardHeight = elRect.height / 2;

    let angleY = -(x - midCardWidth) / 12;
    let angleX = (y - midCardHeight) / 12;
    console.log(x, y);

    el.children[0].style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
  });
  el.addEventListener("mouseleave", () => {
    el.children[0].style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
