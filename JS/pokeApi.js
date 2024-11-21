const image = document.getElementById("pokemon-image");
const form = document.getElementById("search-form");
const nombreTxt = document.getElementById("pokemon-name");
const typesList = document.getElementById("pokemon-types");
const additionalInfo = document.getElementById("pokemon-additional-info");
const audioPokemon = document.getElementById("audio-pokemon"); 

function clearResults() {
    nombreTxt.innerText = "";
    typesList.innerHTML = "";
    image.setAttribute("src", "");
    additionalInfo.innerHTML = "";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const pokemonName = document.getElementById("pokemon-name-input").value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
       
.then((response) => {
   if (!response.ok) throw new Error("Pokémon no encontrado");
   return response.json();
})
.then((pokemon) => {
    clearResults();      
nombreTxt.innerText = pokemon.name;
    const lista = document.createElement("ul");
pokemon.types.forEach((tipo) => {
    const item = document.createElement("li");
item.innerText = tipo.type.name;
item.classList.add(`type-${tipo.type.name}`);
lista.appendChild(item);
});
typesList.appendChild(lista);
image.setAttribute("src", pokemon.sprites.front_shiny);
additionalInfo.innerHTML = `
    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    <p><strong>Estadísticas base:</strong></p>
    `;
audioPokemon.setAttribute("src", pokemon.cries.latest);
audioPokemon.volume = 0.1;
    const statsList = document.createElement("ul");
pokemon.stats.forEach((stat) => {
    const item = document.createElement("li");
item.innerText = `${stat.stat.name}: ${stat.base_stat}`;
statsList.appendChild(item);
});
additionalInfo.appendChild(statsList);
})
.catch((error) => {
clearResults();
nombreTxt.innerText = "Error: " + error.message;
console.error(error);
    });
});
