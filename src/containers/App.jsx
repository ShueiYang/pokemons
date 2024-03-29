import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import SearchProgress from "../components/items/SearchProgress";
import Footer from "../components/Footer";
import "./App.css"
import { fetchPokemon } from "../services/SearchPokemon";
import MainContent from "../components/MainContent";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=25";


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(POKEMON_API_URL);
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [isPending, setPending] = useState(false);
  const [error, setError ] = useState(null);

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
    setTimeout (async () => {
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
  
  function gotoMainPage() {
    setSearchUrl(null)
    setErrorSearch(null)
  };

// create a function to fix a bug on the last page where the pagination limit has been modified
// so the previous page from the last page display incorrect limit.
  function paginationLimit(url) {
    const result = url.match(/25$/)
    return !result ? url.replace(/limit.*$/, "limit=25") : url;
  };
  
  function gotoNextPage() {
    setPokemons([])
    setErrorSearch(null)
    setCurrentPageUrl(paginationLimit(nextPageUrl))
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
      <SearchBar getPokemon= {searchPokemon}/>
        
      <Pagination
        gotoNextPage={nextPageUrl && !searchUrl && 
          !errorSearch ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl && !searchUrl && 
          !errorSearch ? gotoPrevPage : null}
      />  

      {isPending &&
       <SearchProgress />
      }

      <MainContent 
        pokemons={pokemons}
        isPending={isPending}
        searchUrl={searchUrl}
        gotoMainPage={gotoMainPage}
        errorSearch={errorSearch}
      />
      <Footer />  
    </>
  );
}

export default App;