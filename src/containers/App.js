import React, { lazy, Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import SearchProgress from "../components/SearchProgress";
import PokemonList from "../components/PokemonList";
import Homebutton from "../components/Homebutton";
import Footer from "../components/Footer";
import "./App.css"
import { fetchPokemon } from "../services/SearchPokemon";

const Pokeinfo = lazy(()=> import("../components/Pokeinfo"));


function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=25")
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [nextPageUrl, setNextPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [pokeDex, setPokeDex] = useState(null)
  const [isPending, setPending] = useState(false)
  const [error, setError ] = useState(null)

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getAllPokemons = async () => {
      setPending(true)
      try {
        const response = await fetch(currentPageUrl, {signal})
        if(!response.ok) {
          throw new Error(
            `This is an HTTP error : The status is ${response.status}`
          )
        }
        const data = await response.json()
        
        setPrevPageUrl(data.previous)
        setNextPageUrl(data.next)
        
        const getPokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url, {signal})
            return response.json();
          })
        );
        setPokemons([...getPokemonData])
        setError(null)
        setPending(false)
      
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request cancelled!');
        } else {
          setError(err.message)
          setPokemons([]); 
        }
      } finally {
        setLoading(false)
      }
    };
    getAllPokemons();

    return () => {
      controller.abort();
    }
  }, [currentPageUrl]);
   
  //When the function below receive the parameter keyword information from the SearchBar component 
  //it will "react" and search the pokemon.
  
  const [searchUrl, setSearchUrl] = useState(null)
  const [errorSearch, setErrorSearch] = useState(null)
  
  const searchPokemon = (keyword) => {
    if (!keyword) {
      setSearchUrl(null)
      return setErrorSearch(null);
    };
      setPending(true)
      setErrorSearch(null)
  setTimeout ( async () => {
    try{
  // fetchPokemon is an function import from the outside
      const response = await fetchPokemon(keyword.toLowerCase());
        if(response.ok) {
          const results = await response.json();
          setSearchUrl(results)
        } else if (response.status === 404) {
          setErrorSearch(`Pokemon not found ...`)
          setSearchUrl(null)
        }
      } catch (err) {
        setErrorSearch(`Oups...${err.message}`)
        setSearchUrl(null)
      } finally {
        setPending(false)
      }
    },500);
  };
  
  //The function below are set to display different pages as only 25 pokemons 
  //is displayed at the same time on each page.
  
  function gotoMainPage() {
    setSearchUrl(null)
    setErrorSearch(null)
  };
  
  function gotoNextPage() {
    setPokemons([])
    setErrorSearch(null)
  //fix a bug on the last page where the limit is changed so the previous page from the last page display incorrect limit
    setCurrentPageUrl(nextPageUrl.replace(/limit.*$/, "limit=25"))
  };                                     
  
  function gotoPrevPage() {
    setPokemons([])
    setErrorSearch(null)
    setCurrentPageUrl(prevPageUrl)
  };

  
if (loading)
  return <Header message={`Loading ... A moment plz...`}/>
else if (error) 
  return <Header message={`Ooooops something went wrong :(  ${error}`}/>
    
  return (
    <> 
      <Header />
      <SearchBar 
        placeholder="Search by name..."
        getPokemon= {searchPokemon}/>
        
      <Pagination
        gotoNextPage={nextPageUrl && !searchUrl && 
          !errorSearch ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl && !searchUrl && 
          !errorSearch ? gotoPrevPage : null}/>
         
    {isPending &&
      <SearchProgress />
    }
      <div className="container">
        <Suspense fallback={<SearchProgress/>}>
        {pokeDex ? <Pokeinfo data={pokeDex}/> :
          <h1 className="loading">
            {"Click on the card to\nget more information\non Pokemon\nskills and Stats"}
          </h1>}
        </Suspense>
        
      {errorSearch ?  
        <Homebutton error={errorSearch} gotoMainPage={gotoMainPage}/>
      : <PokemonList pokedata={pokemons} 
                    loading={isPending} 
                    infoPokemon={info => setPokeDex(info)} 
                    searchPokemon={searchUrl}
                    mainPage={gotoMainPage}
                  /> 
      } 
      </div>
      <Footer />  
    </>
  );
}

export default App;  
      