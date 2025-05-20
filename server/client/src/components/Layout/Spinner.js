import React from 'react';
import "./spinner.css";

const Spinner = () => {
  return (
    <div className='spinner'>
      <img src={process.env.REACT_APP_LOGO} alt='spinner'/>
    </div>
  )
}

export default Spinner
