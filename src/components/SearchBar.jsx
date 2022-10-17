import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from "@mui/material/Tooltip";
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
            try{
                const resp = await fetchData()
                const data = await resp.json()
                setDataName(data.results)
            } catch (err) {
                console.log(err)
            }
        }
        getData();
    }, [])
            
       
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
                        onKeyPress={handleKeypress}
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
                         
                