class Pokemon {
  constructor() {
    this._minPokemon = 1
    this._maxPokemon = 1025;
  }

  async getRandom() {
    const id = Math.floor(Math.random() * (this._maxPokemon - this._minPokemon + 1)) + this._minPokemon;
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemon = await response.json()
      return this._extractInfo(pokemon)
    } catch(error) {
      console.log("Error fetching pokemon, re-fetching!", error)
      return this.getRandom()
    }
  }

  _extractInfo(pokemon) {
    return {
      name: pokemon.name,
      pictureURL: pokemon.sprites.front_default,
      weight: pokemon.weight
    }
  }
}

module.exports = Pokemon
