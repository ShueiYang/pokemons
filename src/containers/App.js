import React, { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import Pokeinfo from "../components/Pokeinfo";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Mainlogo from "./pokemon-logo.png"
import Footer from "../components/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css"
import { fetchPokemon } from "../services/SearchPokemon";


function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=25")
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [nextPageUrl, setNextPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [pokeDex, setPokeDex] = useState()
  const [searchLoading, setSearchLoading] = useState(false)
  const [error, setError ] = useState(null)

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getAllPokemons = async () => {
        setSearchLoading(true)
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
        
        const getPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const resp = await fetch(pokemon.url);
            return resp.json()
          })
        )
        setPokemons(state => [...state, ...getPokemon])
        setError(null)
        setSearchLoading(false)

        return () => {
          controller.abort();
        }

      } catch (err) {
        if (err.name === 'AbortError') {
          return console.log('Request abort');
        }
        setError(err.message)
        setPokemons(null)
      
      } finally {
        setLoading(false)
      }
    }
    getAllPokemons();
  }, [currentPageUrl])
   
  //When the function below receive the parameter keyword information from the SearchBar component 
  //it will "react" and search the pokemon.
  
  const [searchUrl, setSearchUrl] = useState(null)
  const [errorSearch, setErrorSearch] = useState(null)
  
  const searchPokemon = async (keyword) => {
    if (!keyword) {
      setSearchUrl(null)
      return setErrorSearch(null);
    };
      setSearchLoading(true)
      setErrorSearch(null)
  setTimeout ( async () => {
    try{
  // fetchPokemon is an function import from the outside
      const response = await fetchPokemon(keyword.toLowerCase());
      const results = await response.json();
      setSearchUrl(results)
      setSearchLoading(false)
            
      } catch (err) {
        console.log(err)
        setSearchLoading(false)
        setErrorSearch(`Pokemon not found ...`)
        setSearchUrl(null)
      }
    },1000 );
  }
  
  //The function below are set to display different pages as only 25 pokemons 
  //is displayed at the same time on each page.
  
  function gotoMainPage() {
    setSearchUrl(null)
    setErrorSearch(null)
  }

  function gotoNextPage() {
    setPokemons([])
    setErrorSearch(null)
  //fix a bug on the last page where the limit is changed so the previous page from the last page display incorrect limit
    setCurrentPageUrl(nextPageUrl.replace(/limit.*$/, "limit=25"))
  }                                      

  function gotoPrevPage() {
    setPokemons([])
    setErrorSearch(null)
    setCurrentPageUrl(prevPageUrl)
  }
  
  
if (loading)
  return <div className="logo">
          <img src={Mainlogo} alt="logo" />
          <h2 className="loadfont">{`Loading ... A moment plz ...`}</h2>
        </div>
else if (error) 
  return <div className="logo">
          <img src={Mainlogo} alt="logo" />
          <h2 className="loadfont">{`Ooooops something went wrong :(  ${error}`}</h2>
        </div>   
  
  return (
    <div> 
      <div className="logo">
        <img src={Mainlogo} alt="logo" />
      </div>
      <div>
        <SearchBar placeholder="Search by name..."
                   getPokemon= {searchPokemon}/>
          {searchLoading ? 
            <div className="logo">
              <h1 className="loadfont"> {`Searching ...`}</h1>
              <CircularProgress sx={{color: '#ffcc03'}}/>
            </div> : null}
      </div>
      
      <Pagination
        gotoNextPage={nextPageUrl && !searchLoading &&
          !searchUrl && !errorSearch ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl && !searchLoading &&
          !searchUrl && !errorSearch ? gotoPrevPage : null}
      />    
      
      <div className="container">
        <div className="left-content">
          <Pokeinfo data={pokeDex} />
        </div>
        
       {errorSearch ? ( 
            <div className="logo">
              <h1 className="loadfont">{errorSearch}</h1> 
              <button onClick={gotoMainPage}>Return to Pokedex</button>
            </div>
          ) :  
        <div className="right-content">
          <PokemonList pokedata={pokemons} 
                       loading={searchLoading} 
                       infoPokemon={info => setPokeDex(info)} 
                       searchPokemon={searchUrl}
                       mainPage={gotoMainPage}
                      />                    
        </div> }
      </div>
      <Footer />  
    </div>
  );
}

export default App;    
        
        

      




