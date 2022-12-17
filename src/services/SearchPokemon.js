
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemon(pokemon) {
    return await fetch(`${baseUrl}/${pokemon}`)
}


export async function fetchData() {
    try {
        const resp = await fetch(`${baseUrl}?limit=931`)
        return await resp.json();
    } catch (err) {
        console.log(err)
    }
}