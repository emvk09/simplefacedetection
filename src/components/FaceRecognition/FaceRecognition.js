import React from "react";
import "tachyons";
import './FaceRecognition.css'

const FaceRecognition= ({url, box}) =>{
    return(
        <div className= "flex justify-center">
            <img id= "inputimage" className= "mt2 mb2 br3" alt="" src= {url} width= "500px" height= "auto" />
            <div className="boundingbox" style= {{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}}></div>
        </div>
    )
}

export default FaceRecognition;