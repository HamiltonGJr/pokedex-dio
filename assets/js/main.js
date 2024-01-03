const pokemonsList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offSet = 0;

loadPokemonItems = (offSet, limit) => {
  pokeAPI.getPokemons(offSet, limit).then((pokemons = []) => {
    pokemonsList.innerHTML += pokemons.map((pokemon) =>
      `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
  
        <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
            </ol>
  
            <img src=${pokemon.photo}
            alt="${pokemon.name}">
        </div>
      </li>
    `).join('');
  });
};

loadPokemonItems(offSet, limit);

loadMoreButton.addEventListener('click', () => {
  offSet += limit;

  const qtdRecord = offSet + limit;

  if (qtdRecord >= maxRecords) {
    const newLimit = maxRecords - offSet;

    loadPokemonItems(offSet, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offSet, limit);
  };
});
