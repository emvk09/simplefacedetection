import React from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Form from "./components/Form/Form";
import Rank from "./components/Rank/Rank.js";

class App extends React.Component{
  render(){
    return(
      <div>
        <ParticlesBg type="circle" bg={true} />
        <Navigation />
        <Logo/>
        <Rank/>
        <Form/>
        {/*<FaceRecognition/>*/}
      </div>
    )
  }
}

export default App;
