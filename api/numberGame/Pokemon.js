class Pokemon {
  constructor() {
    this._maxPokemon = 1118;
  }

  async getRandom() {
    const id = Math.floor(Math.random() * this._maxPokemon);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await response.json()
    return this._extractInfo(pokemon)

  }

  _extractInfo(pokemon) {
    return {
      name: pokemon.name.toUpperCase(),
      pictureURL: pokemon.sprites.front_default,
      weight: pokemon.weight
    }
  }
}

module.exports = Pokemon