import React from "react";
import "./Footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
    
     return (
        <div>
            <hr className="hr1"/>
            <div className="footer">  
                <p> 
                    &copy;{new Date().getFullYear()} Developed by ShueiYang   
                </p>
            <hr/>
                <div className="git">
                    <GitHubIcon/><a href="https://github.com/ShueiYang" rel="noreferrer"
                    target="_blank" className="cool-link">GitHub</a>
                </div>
            <hr/>
                <div className="git">
                    <LinkedInIcon/><a href="https://www.linkedin.com/in/shueiyang" rel="noreferrer"
                    target="_blank" className="cool-link">LinkedIn</a>
                </div>
            </div>
        </div>    
     ) 
 }
 
 export default Footer; 
        