
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemon(pokemon) {
    return fetch(`${baseUrl}/${pokemon}`)
}


export async function fetchData() {
    return fetch(`${baseUrl}?limit=931`)

}
  