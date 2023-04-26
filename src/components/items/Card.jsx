import React from "react";


const Card = ({id, name, image, type, type2}) => {
   const style = `${type} card-container` 
    return (
        <div className= {style} >
            <h3> #0{id} </h3>  
            <img src={image} alt="not available..."/>
            <h2> {name} </h2>
            <small> Type: {type} {type2}</small>
        </div>
    )
}

export default Card;
