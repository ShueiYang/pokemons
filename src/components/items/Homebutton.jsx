import React from "react";


const Homebutton = ({error, gotoMainPage}) => {
    
    return (
        <div className="logo">
            <h1 className="loadfont">{error}</h1> 
            <button onClick={gotoMainPage}>Return to Pokedex</button>
        </div>
    ) 
}

export default Homebutton;