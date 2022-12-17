import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const SearchProgress = () => {
    
    return (
        <div className="loading">
          <h1 className="loadfont"> {`Searching ...`}</h1>
          <CircularProgress sx={{color: '#ffcc03'}}/>
        </div>
    ) 
}

export default SearchProgress;