import React from "react";
import Card from "./Card";

const PokemonList = ({pokedata, loading, infoPokemon, searchPokemon, mainPage}) => {
    
      
    if (!loading && searchPokemon)
    return (
      <div className="search">  
        <div onClick= {()=> infoPokemon(searchPokemon)}>
            <Card
            id={searchPokemon.id} 
            name={searchPokemon.name} 
            image={searchPokemon.sprites.other.dream_world.front_default === null?
                searchPokemon.sprites.front_default: searchPokemon.sprites.other.dream_world.front_default}
            type={searchPokemon.types[0].type.name} 
            type2={searchPokemon.types[1] ? searchPokemon.types[1].type.name : null}     
            /> 
        </div>
        <button onClick={mainPage}>Return to Pokedex</button> 
      </div>
    ) 
    
    else if (!loading)
    return (
        <>
        { 
            pokedata.map(pokemon =>{
                return (
                    <div key={pokemon.id} onClick= {()=> infoPokemon(pokemon)}>
                        <Card
                        id={pokemon.id} 
                        name={pokemon.name} 
                        image={pokemon.sprites.other.dream_world.front_default === null?
                             pokemon.sprites.front_default: pokemon.sprites.other.dream_world.front_default}
                        type={pokemon.types[0].type.name} 
                        type2={pokemon.types[1] ? pokemon.types[1].type.name : null}     
                        /> 
                    </div>   
                )   
            })          
        }
       </>   
    )
}

export default PokemonList;  
        
      


