import { lazy, Suspense, useState } from "react";
import PokemonList from "../components/PokemonList";
import Homebutton from "../components/items/Homebutton";
import SearchProgress from "./items/SearchProgress";

const Pokeinfo = lazy(()=> import("../components/Pokeinfo"));


const MainContent = ({pokemons, isPending, searchUrl, gotoMainPage, errorSearch}) => {
  
  const [pokeDex, setPokeDex] = useState(null);
  
  return (
    <div className="container">
      <Suspense fallback={<SearchProgress />}>
        {pokeDex ? (
          <Pokeinfo data={pokeDex} />
        ) : (
          <h1 className="loading">
            {
              "Click on the card to get more information on Pokemon skills and Stats"
            }
          </h1>
        )}
      </Suspense>

      {errorSearch ? (
        <Homebutton error={errorSearch} gotoMainPage={gotoMainPage} />
      ) : (
        <PokemonList
          pokedata={pokemons}
          loading={isPending}
          infoPokemon={(info) => setPokeDex(info)}
          searchPokemon={searchUrl}
          mainPage={gotoMainPage}
        />
      )}
    </div>
  );
};

export default MainContent;
