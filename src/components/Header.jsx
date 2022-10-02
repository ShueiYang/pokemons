import React from "react";
import Mainlogo from "../containers/pokemon-logo.png"

const Header = ({message}) => {
    
    return (
        <>
            { message ? 
                <div className="logo">
                    <img src={Mainlogo} alt="logo" />
                    <h2 className="loadfont">{`${message}`}</h2>
                </div> 
            :   <div className="logo">
                    <img src={Mainlogo} alt="logo" />
                </div>
            }
        </>     
    ) 
}

export default Header;
               
    