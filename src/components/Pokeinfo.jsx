import React from "react";

const Pokeinfo = ({data}) => {
    
    return (
        <div className="left-content">
            <div className="picture">
                <div className="Pokemonfont">{data.name}</div>
                <img src={data.sprites.other.home.front_default}
                    alt="Pic not available..." />
            </div>
            <div className="pokemonStats">    
                <div className="abilities">
                    {data.abilities.map(skill => {
                        const skillType = `${data.types[0].type.name} group`
                        return (
                            <div className= {skillType} key={skill.ability.name}>
                                <h2>{skill.ability.name}</h2>
                            </div>
                        )
                     })   
                    } 
                </div>
                <div className="base-stat">
                    {data.stats.map(elem => {
                        return (
                            <div className="stats" key={elem.stat.name}>
                                <h3>{elem.stat.name}: {elem.base_stat}</h3>
                            </div>
                        )
                     })   
                    } 
                </div>
            </div>
        </div>    
    );
}

export default Pokeinfo; 