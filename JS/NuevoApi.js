const API_URL = "https://rickandmortyapi.com/api/character";
const characterList = document.getElementById("character-list");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close");


fetch(API_URL)
  .then((response) => response.json())
  .then((data) => renderCharacters(data.results))
  .catch((error) => {
    console.error("Error al cargar los personajes:", error);
  });

function renderCharacters(characters) {
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${character.image || 'https://placehold.co/600x400'}" alt="${character.name}">
      <h3>${character.name}</h3>
    `;

   
    card.addEventListener("click", () => openModal(character));
    characterList.appendChild(card);
  });
}

function openModal(character) {
  modalImg.src = character.image || "https://placehold.co/600x400";
  modalName.textContent = character.name;

  modalDescription.innerHTML = `
    <p><strong>Especie:</strong> ${character.species || 'Desconocida'}</p>
    <p><strong>Género:</strong> ${character.gender || 'Desconocido'}</p>
    <p><strong>Estado:</strong> ${character.status || 'Desconocido'}</p>
    <p><strong>Origen:</strong> ${character.origin.name || 'Desconocido'}</p>
  `;

  
  modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
