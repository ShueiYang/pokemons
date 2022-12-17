import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from "@mui/material/Tooltip";
import useClickOutside from "../services/UseClickOutside";


const SearchBar = ({placeholder, getPokemon}) => {

    const [dataName, setDataName] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [open, setOpen]= useState(false);
    const domNode = useRef() 
    
  // use Dynamic import to import the function and fetch only once if someone use the searchbar, 
  // in order to display on the SearchBar as name suggesion.
      
    useEffect(() => {     
        if (open && dataName.length === 0) {
            const getData = async () => {
                const { fetchData } = await import('../services/SearchPokemon');
                const data = await fetchData();
                setDataName(data.results) 
            }
            getData();
        }
    }, [open, dataName.length]);
            
       
    const handleChange = event => {
        setSearchWord(event.target.value)
        setOpen(true) 
    }

    const handleKeypress = event => {
        if(event.key === 'Enter') {
            getPokemon(searchWord)
            setOpen(false);
        }
    }
    
    const handleSearch = dropdownListName => {
        setSearchWord(dropdownListName)
        getPokemon(dropdownListName)
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
                        onKeyDown={handleKeypress}
                    />
                
                {searchWord.length !== 0 ?
                    <div className="searchIcon" >
                        <CloseIcon onClick= {clearInput}/>
                    </div> : null}
                
                <hr className="hr2"/>  
                    <div className="searchIcon" >
                        <Tooltip title="Search">
                          <SearchIcon fontSize="large" onClick= {()=> {handleSearch(searchWord)}}/>  
                        </Tooltip>
                    </div>
                </div>
                {open && (
                <div className= "dropdown"  >
                    {newFilter.slice(0,15).map(item => ( 
                        <div className= "optionList"
                             key={item.name}
                             onClick= {() => {handleSearch(item.name)}}>
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
                         
                