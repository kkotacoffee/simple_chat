import React from 'react';
import './index.css';

function ShowImage (props){

    return (
      <div>
        <img src={`${process.env.PUBLIC_URL}/images/${props.num}.jpg`} alt="Logo" style = {props.style}/>
      </div>
    );
}

export default ShowImage;