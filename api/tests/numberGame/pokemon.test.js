const Player = require("../../numberGame/Player")
const Pokemon = require("../../numberGame/Pokemon")
const fetchMock = require("jest-fetch-mock")


describe('pokemon', () => {
  test('initiates with _maxPokemon size of 1118', () => {
    const pokemon = new Pokemon()
    expect(pokemon._maxPokemon).toBe(1025)
  })

  test('_extractInfo extracts the name, pictureURL and weight from the pokemon object', () => {
    const pokemon = new Pokemon()
    const mockPokemon = {
      name: "Sam",
      sprites: { front_default: "http://mockAddress.com" },
      weight: 12
    }
    expect(pokemon._extractInfo(mockPokemon)).toEqual({ name: "Sam", pictureURL: "http://mockAddress.com", weight: 12 })

  })
  test('getRandom retreives a pokemon, then extracts the info', async () => {
    fetchMock.enableMocks();
    const pokemon = new Pokemon()
    fetchMock.mockResponseOnce(JSON.stringify({ name: "sam", sprites: {front_default: "http://mocksite.com"}, weight: 75 }));

    expect(await pokemon.getRandom()).toEqual({name: "sam", pictureURL: "http://mocksite.com", weight: 75})

    fetchMock.resetMocks();
  })
})