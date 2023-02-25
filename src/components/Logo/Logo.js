import React from "react";
import "tachyons";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png';

const Logo= () =>{
    return(
        <div>
            <Tilt className="Tilt flex justify-center w-10 pa3 ml3 br3 shadow-3">
                <img alt= "logo" src= {brain}/>
            </Tilt>
        </div>
    )
}

export default Logo;