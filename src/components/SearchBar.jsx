import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { fetchData } from "../services/SearchPokemon";
import useClickOutside from "../services/UseClickOutside";


const SearchBar = ({placeholder, getPokemon}) => {

    const [dataName, setDataName] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [open, setOpen]= useState(false);
    const domNode = useRef() 
    
  // this function fetch the data from the entire list of pokemon's name once, 
  // in order to display on the SearchBar as name suggesion.

    useEffect(() => { 
        const getData = async () => {
            const resp = await fetchData()
            const data = await resp.json()
            setDataName(data.results)
            }    
            getData();
    }, [])
    
   
    const handleChange = event => {
        setSearchWord(event.target.value)
        setOpen(true) 
    }
    const handleSubmit = event => {
        getPokemon(searchWord)
    }
    const handleKeypress = event => {
        if(event.key === 'Enter') {
            handleSubmit()
            setOpen(false);
        }
    }
    const onSearch = searchTerm => {
        setSearchWord(searchTerm)
        getPokemon(searchTerm)
        setOpen(false)
    }

    const clearInput = () => {
        setSearchWord("")
    }  
    
    //the function is import from outside
    useClickOutside(domNode, ()=> setOpen(false));
      
    
    const newFilter = dataName.filter(item => {
        const searchTerm = searchWord.toLowerCase()
        const fullName = item.name.toLowerCase()
        return (searchTerm && fullName.includes(searchTerm))
    })       
  
    return (
        <div className="search">    
            <div className="search-container" ref={domNode} >
                <div className="searchInputs">
                    <input 
                        type="text"
                        placeholder= {placeholder}
                        value = {searchWord}
                        onChange= {handleChange}
                        onKeyPress={handleKeypress}
                    />    
                    
                    <div className="searchIcon" >
                        {searchWord.length === 0 ? <SearchIcon fontSize="large"/>
                         : <CloseIcon id="clearBtn" 
                                      fontSize="large" 
                                      onClick= {clearInput}/>}
                    </div>
                </div>
                {open && (
                <div className= "dropdown"  >
                    {newFilter.slice(0,15).map(item => ( 
                        <div className= "optionList"
                             key={item.name}
                             onClick= {() => {onSearch(item.name)}}>
                            <p>{item.name}</p>
                        </div>  
                      ))                   
                    }
                </div>
                )}      
            </div>
        </div> 
    );
}

export default SearchBar;      
                                 
                                            
                                            
                                             
                              
    
  

             
    
    
    
    
    

       







             
                    
                          
                 
// {`dropdown ${open ? "open" : null}`}    
// searchWord !== ""