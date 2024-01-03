const pokeAPI = {};

convertPokeAPIDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();

  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
};

pokeAPI.getPokemonDetail = (pokemon) => {
  // Convertendo a lista de detalhes pokemon em .json()
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeAPIDetailToPokemon)
    .catch((error) => console.error(error));
};

pokeAPI.getPokemons = (offSet, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;

  // Estamos buscando a nossa lista
  return fetch(url)
    // Estamos tranformando o response em .json()
    .then((response) => response.json())
    // Estamos filtrando por results
    .then((jsonBody) => jsonBody.results)
    // Estamos mapeando (.map()) esta lista de pokemons, em uma lista de requisições de detalhes deste pokemons
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
    // Aqui estamos esperando que todas as requisições terminem em uma Promisse
    .then((detailRequest) => Promise.all(detailRequest))
    // Aqui estamos devolvendo  lista detalhada de cada pokemon
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error));
};

// Promise.all([
//   fetch('https://pokeapi.co/api/v2/pokemon/1'),
//   fetch('https://pokeapi.co/api/v2/pokemon/2'),
//   fetch('https://pokeapi.co/api/v2/pokemon/3'),
//   fetch('https://pokeapi.co/api/v2/pokemon/4'),
//   fetch('https://pokeapi.co/api/v2/pokemon/5'),
// ]).then((results) => {
//   console.log(results);
// });
